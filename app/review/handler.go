package review

import (
	"context"

	"github.com/labstack/echo/v4"
)

type servicer interface {
	GetAllCompany(ctx context.Context) ([]ByCompany, error)
}

type handler struct {
	svc servicer
}

func NewHandler(service servicer) *handler {
	return &handler{svc: service}
}

func (h *handler) GetAllCompany(ec echo.Context) error {

	ctx := ec.Request().Context()
	if ctx == nil {
		ctx = context.Background()
	}

	companies, err := h.svc.GetAllCompany(ctx)
	if err != nil {
		return ec.JSON(500, err)
	}

	return ec.JSON(200, companies)
}
