package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"review/app/review"
	"review/config"
	"review/logger"
	"review/mw"
	"review/storage"
	"syscall"

	"github.com/labstack/echo/v4"
	"go.uber.org/zap"
)

func main() {
	// context
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	// config
	cfg := config.NewConfig()

	// logger
	logger := logger.NewZapLogger(cfg.LogLevel)
	defer logger.Sync()

	// storage
	mgc, err := storage.NewMongoClient(cfg.Mongo)
	if err != nil {
		logger.Sugar().Panicf("Error database client: %v", err)
		return
	}
	logger.Info("Connected to MongoDB")

	// service
	reviewStorage := review.NewStorage(cfg.Mongo, mgc)
	reviewService := review.NewService(reviewStorage)
	reviewHandler := review.NewHandler(reviewService)

	// http server
	server := echo.New()
	server.Use(mw.HealthCheck())
	server.Use(mw.NewLoggerWithRequestId(logger))
	server.GET(cfg.HttpServer.Path.GetAllCompany, reviewHandler.GetAllCompany)
	server.GET(cfg.HttpServer.Path.GetOverView, reviewHandler.GetReviewByOverview)
	server.GET(cfg.HttpServer.Path.GetSalary, reviewHandler.GetReviewBySalary)
	server.GET(cfg.HttpServer.Path.GetBenefit, reviewHandler.GetReviewByBenefit)
	server.GET(cfg.HttpServer.Path.GetInterview, reviewHandler.GetReviewByInterview)

	go func() {
		err := server.Start(":" + cfg.HttpServer.Port)
		if err != nil && err != http.ErrServerClosed {
			log.Panicf("start http server error: %v", err)
		}
	}()

	// ========= graceful shutdown ========= //
	idleConnsClosed := make(chan struct{})

	go func() {
		sig := make(chan os.Signal, 1)
		signal.Notify(sig, syscall.SIGINT, syscall.SIGTERM)
		<-sig

		ctx, cancel := context.WithTimeout(ctx, cfg.HttpServer.GracefulTimeout)
		defer cancel()

		// shutdown ...
		err := server.Shutdown(ctx)
		if err != nil {
			logger.Error("Server shutdown error", zap.Error(err))
		}

		close(idleConnsClosed)
	}()

	<-idleConnsClosed
	logger.Info("Server shutdown gracefully")
}
