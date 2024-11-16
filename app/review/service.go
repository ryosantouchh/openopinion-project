package review

import (
	"context"
	"math"
	"review/app"

	"go.uber.org/zap"
)

type Storager interface {
	GetAllCompany(ctx context.Context, pgSize, pgNum int) ([]ByCompany, error)
	GetCompanyByName(ctx context.Context, companyDomain string) (ByCompany, error)
	GetReviewByOverview(ctx context.Context, companyDomain, postId string, pgSize, pgNum int) ([]OverView, error)
	GetReviewBySalary(ctx context.Context, companyDomain, postId string, pgSize, pgNum int) ([]Salary, error)
	GetReviewByBenefit(ctx context.Context, companyDomain, postId string, pgSize, pgNum int) ([]Benefit, error)
	GetReviewByInterview(ctx context.Context, companyDomain, postId string, pgSize, pgNum int) ([]Interview, error)
}

type service struct {
	storage Storager
}

func NewService(storage Storager) *service {
	return &service{
		storage: storage,
	}
}

func (s *service) GetAllCompany(ctx context.Context, pgSize, pgNum int) ([]ByCompany, error) {
	logger := app.GetLoggerFromCtx(ctx)
	logger.Info("Get all company")
	companyList, err := s.storage.GetAllCompany(ctx, pgSize, pgNum)
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

func (s *service) GetCompanyByName(ctx context.Context, companyDomain string) (ByCompany, error) {
	logger := app.GetLoggerFromCtx(ctx)
	logger.Info("Get 1 company")
	companyList, err := s.storage.GetCompanyByName(ctx, companyDomain)
	if err != nil {
		logger.Error("Failed to get all company", zap.Error(err))
		return ByCompany{}, nil
	}

	companyList.Score.Overview.Rating = calRating(companyList.Score.Overview.TotalCount, companyList.Score.Overview.TotalScore)
	companyList.Score.Salary.Rating = calRating(companyList.Score.Salary.TotalCount, companyList.Score.Salary.TotalScore)
	companyList.Score.Benefit.Rating = calRating(companyList.Score.Benefit.TotalCount, companyList.Score.Benefit.TotalScore)
	companyList.Score.Interview.Rating = calRating(companyList.Score.Interview.TotalCount, companyList.Score.Interview.TotalScore)

	logger.Debug("Get 1 company success")
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

func (s *service) GetReviewByOverview(ctx context.Context, companyDomain, postId string,
	pgSize, pgNum int) ([]OverView, error) {
	logger := app.GetLoggerFromCtx(ctx)
	logger.Info("Get review by overview", zap.String("companyDomain", companyDomain), zap.Int("pgSize", pgSize), zap.Int("pgNum", pgNum))

	reviews, err := s.storage.GetReviewByOverview(ctx, companyDomain, postId, pgSize, pgNum)
	if err != nil {
		logger.Error("Failed to get review by overview", zap.Error(err))
		return nil, err
	}

	logger.Debug("Get review by overview success")
	return reviews, nil
}

func (s *service) GetReviewBySalary(ctx context.Context, companyDomain, postId string,
	pgSize, pgNum int) ([]Salary, error) {
	logger := app.GetLoggerFromCtx(ctx)
	logger.Info("Get review by salary", zap.String("companyDomain", companyDomain), zap.Int("pgSize", pgSize), zap.Int("pgNum", pgNum))

	reviews, err := s.storage.GetReviewBySalary(ctx, companyDomain, postId, pgSize, pgNum)
	if err != nil {
		logger.Error("Failed to get review by salary", zap.Error(err))
		return nil, err
	}

	logger.Debug("Get review by salary success")
	return reviews, nil
}

func (s *service) GetReviewByBenefit(ctx context.Context, companyDomain, postId string,
	pgSize, pgNum int) ([]Benefit, error) {
	logger := app.GetLoggerFromCtx(ctx)
	logger.Info("Get review by benefit", zap.String("companyDomain", companyDomain), zap.Int("pgSize", pgSize), zap.Int("pgNum", pgNum))

	reviews, err := s.storage.GetReviewByBenefit(ctx, companyDomain, postId, pgSize, pgNum)
	if err != nil {
		logger.Error("Failed to get review by benefit", zap.Error(err))
		return nil, err
	}

	logger.Debug("Get review by benefit success")
	return reviews, nil
}

func (s *service) GetReviewByInterview(ctx context.Context, companyDomain, postId string,
	pgSize, pgNum int) ([]Interview, error) {
	logger := app.GetLoggerFromCtx(ctx)
	logger.Info("Get review by interview", zap.String("companyDomain", companyDomain), zap.Int("pgSize", pgSize), zap.Int("pgNum", pgNum))

	reviews, err := s.storage.GetReviewByInterview(ctx, companyDomain, postId, pgSize, pgNum)
	if err != nil {
		logger.Error("Failed to get review by interview", zap.Error(err))
		return nil, err
	}

	logger.Debug("Get review by interview success")
	return reviews, nil
}
