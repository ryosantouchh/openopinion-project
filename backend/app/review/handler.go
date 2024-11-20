package review

import (
	"context"
	"review/config"
	"strconv"

	"github.com/labstack/echo/v4"
)

type servicer interface {
	GetAllCompany(ctx context.Context, pgSize, pgNum int) ([]ByCompany, error)
	GetCompanyByName(ctx context.Context, companyDomain string) (ByCompany, error)
	GetReviewByOverview(ctx context.Context, companyDomain, postId string, pgSize, pgNum int) ([]OverView, error)
	GetReviewBySalary(ctx context.Context, companyDomain, postId string, pgSize, pgNum int) ([]Salary, error)
	GetReviewByBenefit(ctx context.Context, companyDomain, postId string, pgSize, pgNum int) ([]Benefit, error)
	GetReviewByInterview(ctx context.Context, companyDomain, postId string, pgSize, pgNum int) ([]Interview, error)
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

	switch ec.QueryParam("companyId") {
	case "":
		companies, err := h.svc.GetAllCompany(ctx, pgSize, pgNum)
		if err != nil {
			return ec.JSON(500, err)
		}
		if len(companies) == 0 {
			return ec.JSON(404, "No company found")
		}
		return ec.JSON(200, companies)
	default:
		companyDomain := ec.QueryParam("companyId")
		companies, err := h.svc.GetCompanyByName(ctx, companyDomain)
		if err != nil {
			return ec.JSON(500, err)
		}
		if companies.DomainName == "" {
			return ec.JSON(404, "No company found")
		}
		return ec.JSON(200, companies)
	}

}

func (h *handler) GetCompanyByName(ec echo.Context) error {
	ctx := ec.Request().Context()
	companyDomain := ec.QueryParam("companyId")

	companies, err := h.svc.GetCompanyByName(ctx, companyDomain)
	if err != nil {
		return ec.JSON(500, err)
	}
	if companies.DomainName == "" {
		return ec.JSON(404, "No company found")
	}

	return ec.JSON(200, companies)
}

func (h *handler) GetReviewByOverview(ec echo.Context) error {
	ctx := ec.Request().Context()
	companyDomain := ec.QueryParam("companyId")
	postId := ec.QueryParam("postId")

	pgSize, err := strconv.Atoi(ec.QueryParam("pageSize"))
	if err != nil {
		pgSize = h.cfg.Pagesize
	}
	pgNum, err := strconv.Atoi(ec.QueryParam("pageNum"))
	if err != nil {
		pgNum = h.cfg.Pagenum
	}

	reviews, err := h.svc.GetReviewByOverview(ctx, companyDomain, postId, pgSize, pgNum)
	if err != nil {
		return ec.JSON(500, err)
	}
	if len(reviews) == 0 {
		return ec.JSON(404, "No review found")
	}
	if postId != "" {
		return ec.JSON(200, reviews[0])
	}

	return ec.JSON(200, reviews)
}

func (h *handler) GetReviewBySalary(ec echo.Context) error {
	ctx := ec.Request().Context()
	companyDomain := ec.QueryParam("companyId")
	postId := ec.QueryParam("postId")
	pgSize, err := strconv.Atoi(ec.QueryParam("pageSize"))
	if err != nil {
		pgSize = h.cfg.Pagesize
	}
	pgNum, err := strconv.Atoi(ec.QueryParam("pageNum"))
	if err != nil {
		pgNum = h.cfg.Pagenum
	}

	reviews, err := h.svc.GetReviewBySalary(ctx, companyDomain, postId, pgSize, pgNum)
	if err != nil {
		return ec.JSON(500, err)
	}
	if len(reviews) == 0 {
		return ec.JSON(404, "No review found")
	}
	if postId != "" {
		return ec.JSON(200, reviews[0])
	}

	return ec.JSON(200, reviews)
}

func (h *handler) GetReviewByBenefit(ec echo.Context) error {
	ctx := ec.Request().Context()
	companyDomain := ec.QueryParam("companyId")
	postId := ec.QueryParam("postId")
	pgSize, err := strconv.Atoi(ec.QueryParam("pageSize"))
	if err != nil {
		pgSize = h.cfg.Pagesize
	}
	pgNum, err := strconv.Atoi(ec.QueryParam("pageNum"))
	if err != nil {
		pgNum = h.cfg.Pagenum
	}

	reviews, err := h.svc.GetReviewByBenefit(ctx, companyDomain, postId, pgSize, pgNum)
	if err != nil {
		return ec.JSON(500, err)
	}
	if len(reviews) == 0 {
		return ec.JSON(404, "No review found")
	}
	if postId != "" {
		return ec.JSON(200, reviews[0])
	}

	return ec.JSON(200, reviews)
}

func (h *handler) GetReviewByInterview(ec echo.Context) error {
	ctx := ec.Request().Context()
	companyDomain := ec.QueryParam("companyId")
	postId := ec.QueryParam("postId")
	pgSize, err := strconv.Atoi(ec.QueryParam("pageSize"))
	if err != nil {
		pgSize = h.cfg.Pagesize
	}
	pgNum, err := strconv.Atoi(ec.QueryParam("pageNum"))
	if err != nil {
		pgNum = h.cfg.Pagenum
	}

	reviews, err := h.svc.GetReviewByInterview(ctx, companyDomain, postId, pgSize, pgNum)
	if err != nil {
		return ec.JSON(500, err)
	}
	if len(reviews) == 0 {
		return ec.JSON(404, "No review found")
	}
	if postId != "" {
		return ec.JSON(200, reviews[0])
	}

	return ec.JSON(200, reviews)
}
