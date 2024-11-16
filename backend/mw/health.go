package mw

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func HealthCheck() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			if c.Request().URL.Path == "/health" {
				return c.NoContent(http.StatusOK)
			}
			return next(c)
		}
	}
}
