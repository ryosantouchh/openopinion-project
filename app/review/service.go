package review

import (
	"context"
	"math"
	"review/app"

	"go.uber.org/zap"
)

type Storager interface {
	GetAllCompany(ctx context.Context) ([]ByCompany, error)
}

type service struct {
	storage Storager
}

func NewService(storage Storager) *service {
	return &service{
		storage: storage,
	}
}

func (s *service) GetAllCompany(ctx context.Context) ([]ByCompany, error) {
	logger := app.GetLoggerFromCtx(ctx)
	logger.Info("Get all company")
	companyList, err := s.storage.GetAllCompany(ctx)
	if err != nil {
		logger.Error("Failed to get all company", zap.Error(err))
		return nil, err
	}

	// cal rating
	for i := range companyList {
		companyList[i].Score.Overview.Rating = calRating(companyList[i].Score.Overview.TotalCount, companyList[i].Score.Overview.TotalScore)
		companyList[i].Score.Salary.Rating = calRating(companyList[i].Score.Salary.TotalCount, companyList[i].Score.Salary.TotalScore)
		companyList[i].Score.Benefit.Rating = calRating(companyList[i].Score.Benefit.TotalCount, companyList[i].Score.Benefit.TotalScore)
		companyList[i].Score.Interview.Rating = calRating(companyList[i].Score.Interview.TotalCount, companyList[i].Score.Interview.TotalScore)
	}

	logger.Debug("Get all company success")
	return companyList, nil
}

func calRating(totalCount int, totalScore float32) float32 {
	if totalCount == 0 {
		return 0
	}

	// Calculate average score
	average := totalScore / float32(totalCount)

	// Round to nearest 0.5
	// Multiply by 2, round to nearest integer, then divide by 2
	result := float32(math.Round(float64(average)*2) / 2)

	return result
}
