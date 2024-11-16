package logger

import (
	"log"
	"strings"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

func NewZapLogger(logLevel string) *zap.Logger {
	logLevel = strings.ToLower(logLevel)

	var level zapcore.Level
	switch logLevel {
	case "debug":
		level = zapcore.DebugLevel
	case "info":
		level = zapcore.InfoLevel
	case "warn":
		level = zapcore.WarnLevel
	case "error":
		level = zapcore.ErrorLevel
	case "dpanic":
		level = zapcore.DPanicLevel
	case "panic":
		level = zapcore.PanicLevel
	case "fatal":
		level = zapcore.FatalLevel
	default:
		level = zapcore.InfoLevel
	}

	encoderCfg := zap.NewProductionEncoderConfig()
	encoderCfg.EncodeTime = zapcore.ISO8601TimeEncoder
	encoderCfg.TimeKey = "ts"
	encoderCfg.MessageKey = "message"
	encoderCfg.LevelKey = "severity"

	config := zap.NewProductionConfig()
	config.EncoderConfig = encoderCfg
	config.Level.SetLevel(level)

	logger, err := config.Build()
	if err != nil {
		log.Panicf("failed to create logger: %v", err)
	}

	return logger
}
