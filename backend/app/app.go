package app

import (
	"context"

	"go.uber.org/zap"
)

type Logger string

const LoggerKey Logger = "logger"

func GetLoggerFromCtx(ctx context.Context) *zap.Logger {
	return ctx.Value(LoggerKey).(*zap.Logger)
}
