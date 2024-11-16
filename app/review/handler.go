package review

import (
	"context"
	"review/config"
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
	cfg config.DefaultQueryValue
	svc servicer
}

func NewHandler(cfg config.DefaultQueryValue, service servicer) *handler {
	return &handler{cfg, service}
}

func (h *handler) GetAllCompany(ec echo.Context) error {
	ctx := ec.Request().Context()
	pgSize, err := strconv.Atoi(ec.QueryParam("pageSize"))
	if err != nil {
		pgSize = h.cfg.Pagesize
	}
	pgNum, err := strconv.Atoi(ec.QueryParam("pageNum"))
	if err != nil {
		pgNum = h.cfg.Pagenum
	}

	companies, err := h.svc.GetAllCompany(ctx, pgSize, pgNum)
	if err != nil {
		return ec.JSON(500, err)
	}

	return ec.JSON(200, companies)
}

func (h *handler) GetReviewByOverview(ec echo.Context) error {
	ctx := ec.Request().Context()
	companyDomain := ec.QueryParam("companyId")
	pgSize, err := strconv.Atoi(ec.QueryParam("pageSize"))
	if err != nil {
		pgSize = h.cfg.Pagesize
	}
	pgNum, err := strconv.Atoi(ec.QueryParam("pageNum"))
	if err != nil {
		pgNum = h.cfg.Pagenum
	}

	reviews, err := h.svc.GetReviewByOverview(ctx, companyDomain, pgSize, pgNum)
	if err != nil {
		return ec.JSON(500, err)
	}

	return ec.JSON(200, reviews)
}

func (h *handler) GetReviewBySalary(ec echo.Context) error {
	ctx := ec.Request().Context()
	companyDomain := ec.QueryParam("companyId")
	pgSize, err := strconv.Atoi(ec.QueryParam("pageSize"))
	if err != nil {
		pgSize = h.cfg.Pagesize
	}
	pgNum, err := strconv.Atoi(ec.QueryParam("pageNum"))
	if err != nil {
		pgNum = h.cfg.Pagenum
	}

	reviews, err := h.svc.GetReviewBySalary(ctx, companyDomain, pgSize, pgNum)
	if err != nil {
		return ec.JSON(500, err)
	}

	return ec.JSON(200, reviews)
}

func (h *handler) GetReviewByBenefit(ec echo.Context) error {
	ctx := ec.Request().Context()
	companyDomain := ec.QueryParam("companyId")
	pgSize, err := strconv.Atoi(ec.QueryParam("pageSize"))
	if err != nil {
		pgSize = h.cfg.Pagesize
	}
	pgNum, err := strconv.Atoi(ec.QueryParam("pageNum"))
	if err != nil {
		pgNum = h.cfg.Pagenum
	}

	reviews, err := h.svc.GetReviewByBenefit(ctx, companyDomain, pgSize, pgNum)
	if err != nil {
		return ec.JSON(500, err)
	}

	return ec.JSON(200, reviews)
}

func (h *handler) GetReviewByInterview(ec echo.Context) error {
	ctx := ec.Request().Context()
	companyDomain := ec.QueryParam("companyId")
	pgSize, err := strconv.Atoi(ec.QueryParam("pageSize"))
	if err != nil {
		pgSize = h.cfg.Pagesize
	}
	pgNum, err := strconv.Atoi(ec.QueryParam("pageNum"))
	if err != nil {
		pgNum = h.cfg.Pagenum
	}

	reviews, err := h.svc.GetReviewByInterview(ctx, companyDomain, pgSize, pgNum)
	if err != nil {
		return ec.JSON(500, err)
	}

	return ec.JSON(200, reviews)
}
