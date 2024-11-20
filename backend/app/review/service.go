package review

import (
	"context"
	"log"
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
	CountReviewByCompanyAndType(ctx context.Context, companyDomain, t string) (int, error)
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

	// get len of each type
	for i := range companyList {
		companyName := companyList[i].DomainName

		// query in each type
		overviewCount, err := s.storage.CountReviewByCompanyAndType(ctx, companyName, "overview")
		if err != nil {
			logger.Error("Failed to get count review by company and type", zap.Error(err))
			return nil, err
		}

		salCount, err := s.storage.CountReviewByCompanyAndType(ctx, companyName, "salary")
		if err != nil {
			logger.Error("Failed to get count review by company and type", zap.Error(err))
			return nil, err
		}

		benefitCount, err := s.storage.CountReviewByCompanyAndType(ctx, companyName, "benefit")
		if err != nil {
			logger.Error("Failed to get count review by company and type", zap.Error(err))
			return nil, err
		}

		interviewCount, err := s.storage.CountReviewByCompanyAndType(ctx, companyName, "interview")
		if err != nil {
			logger.Error("Failed to get count review by company and type", zap.Error(err))
			return nil, err
		}

		companyList[i].CountReview = overviewCount + salCount + benefitCount + interviewCount
		companyList[i].CountInterview = interviewCount
		companyList[i].CountSal = salCount
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
	for i := range reviews {
		reviews[i].Content = reviews[i].Review.Content
		reviews[i].Position = reviews[i].Review.Position
		reviews[i].Title = reviews[i].Review.Title
		reviews[i].Rating = reviews[i].Review.Rating
	}
	log.Printf("reviews: %+v", reviews)

	logger.Debug("Get review by overview success", zap.Any("reviews", reviews))
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

	for i := range reviews {
		reviews[i].Salary = reviews[i].Review.Salary
		reviews[i].Position = reviews[i].Review.Position
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

	for i := range reviews {
		reviews[i].Position = reviews[i].Review.Position
		reviews[i].Wfh = reviews[i].Review.Wfh
		reviews[i].HealthInsurance = reviews[i].Review.HealthInsurance
		reviews[i].CoursePaid = reviews[i].Review.CoursePaid
		reviews[i].StockPlan = reviews[i].Review.StockPlan
		reviews[i].StockOption = reviews[i].Review.StockOption
		reviews[i].AnnualLeave = reviews[i].Review.AnnualLeave
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

	for i := range reviews {
		reviews[i].Position = reviews[i].Review.Position
		reviews[i].Difficulty = reviews[i].Review.Difficulty
		reviews[i].Content = reviews[i].Review.Content
		reviews[i].Title = reviews[i].Review.Title
	}

	logger.Debug("Get review by interview success")
	return reviews, nil
}
