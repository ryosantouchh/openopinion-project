package review

import (
	"context"
	"strconv"

	"github.com/labstack/echo/v4"
)

type servicer interface {
	GetAllCompany(ctx context.Context, pgSize, pgNum int) ([]ByCompany, error)
	GetReviewByOverview(ctx context.Context, companyDomain string, pgSize, pgNum int) ([]OverView, error)
	GetReviewBySalary(ctx context.Context, companyDomain string, pgSize, pgNum int) ([]Salary, error)
	GetReviewByBenefit(ctx context.Context, companyDomain string, pgSize, pgNum int) ([]Benefit, error)
	GetReviewByInterview(ctx context.Context, companyDomain string, pgSize, pgNum int) ([]Interview, error)
}

type handler struct {
	svc servicer
}

func NewHandler(service servicer) *handler {
	return &handler{svc: service}
}

func (h *handler) GetAllCompany(ec echo.Context) error {
	ctx := ec.Request().Context()
	pgSize, err := strconv.Atoi(ec.QueryParam("pageSize"))
	if err != nil {
		return ec.JSON(400, err)
	}
	pgNum, err := strconv.Atoi(ec.QueryParam("pageNum"))
	if err != nil {
		return ec.JSON(400, err)
	}

	companies, err := h.svc.GetAllCompany(ctx, pgSize, pgNum)
	if err != nil {
		return ec.JSON(500, err)
	}

	return ec.JSON(200, companies)
}

func (h *handler) GetReviewByOverview(ec echo.Context) error {
	ctx := ec.Request().Context()
	companyDomain := ec.Param("companyId")
	pgSize, err := strconv.Atoi(ec.QueryParam("pageSize"))
	if err != nil {
		return ec.JSON(400, err)
	}
	pgNum, err := strconv.Atoi(ec.QueryParam("pageNum"))
	if err != nil {
		return ec.JSON(400, err)
	}

	reviews, err := h.svc.GetReviewByOverview(ctx, companyDomain, pgSize, pgNum)
	if err != nil {
		return ec.JSON(500, err)
	}

	return ec.JSON(200, reviews)
}

func (h *handler) GetReviewBySalary(ec echo.Context) error {
	ctx := ec.Request().Context()
	companyDomain := ec.Param("companyId")
	pgSize, err := strconv.Atoi(ec.QueryParam("pageSize"))
	if err != nil {
		return ec.JSON(400, err)
	}
	pgNum, err := strconv.Atoi(ec.QueryParam("pageNum"))
	if err != nil {
		return ec.JSON(400, err)
	}

	reviews, err := h.svc.GetReviewBySalary(ctx, companyDomain, pgSize, pgNum)
	if err != nil {
		return ec.JSON(500, err)
	}

	return ec.JSON(200, reviews)
}

func (h *handler) GetReviewByBenefit(ec echo.Context) error {
	ctx := ec.Request().Context()
	companyDomain := ec.Param("companyId")
	pgSize, err := strconv.Atoi(ec.QueryParam("pageSize"))
	if err != nil {
		return ec.JSON(400, err)
	}
	pgNum, err := strconv.Atoi(ec.QueryParam("pageNum"))
	if err != nil {
		return ec.JSON(400, err)
	}

	reviews, err := h.svc.GetReviewByBenefit(ctx, companyDomain, pgSize, pgNum)
	if err != nil {
		return ec.JSON(500, err)
	}

	return ec.JSON(200, reviews)
}

func (h *handler) GetReviewByInterview(ec echo.Context) error {
	ctx := ec.Request().Context()
	companyDomain := ec.Param("companyId")
	pgSize, err := strconv.Atoi(ec.QueryParam("pageSize"))
	if err != nil {
		return ec.JSON(400, err)
	}
	pgNum, err := strconv.Atoi(ec.QueryParam("pageNum"))
	if err != nil {
		return ec.JSON(400, err)
	}

	reviews, err := h.svc.GetReviewByInterview(ctx, companyDomain, pgSize, pgNum)
	if err != nil {
		return ec.JSON(500, err)
	}

	return ec.JSON(200, reviews)
}
