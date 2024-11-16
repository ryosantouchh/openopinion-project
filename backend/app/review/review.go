package review

type OverView struct {
	User struct {
		Address string `json:"address"`
	} `json:"user"`
	RecordId  string `json:"record_id" bson:"_id"`         // Hidden from JSON, visible for BSON
	CompanyId string `json:"company_id" bson:"company"`    // Hidden from JSON, visible for BSON
	CreatedAt string `json:"created_at" bson:"created_at"` // Hidden from JSON, visible for BSON
	Position  string `json:"position" bson:"-"`
	Title     string `json:"title" bson:"-"`
	Rating    int    `json:"rating" bson:"-"`
	Content   string `json:"content" bson:"-"`
	Review    struct {
		Position string `bson:"position" json:"-"`
		Title    string `bson:"title" json:"-"`
		Rating   int    `bson:"rating" json:"-"`
		Content  string `bson:"content" json:"-"`
	} `bson:"review" json:"-"`
}

type Salary struct {
	User struct {
		Address string `json:"address"`
	} `json:"user"`
	RecordId  string `json:"record_id" bson:"_id"`         // Hidden from JSON, visible for BSON
	CompanyId string `json:"company_id" bson:"company"`    // Hidden from JSON, visible for BSON
	CreatedAt string `json:"created_at" bson:"created_at"` // Hidden from JSON, visible for BSON
	Salary    string `bson:"salary"`
	Position  string `bson:"position"`
	Review    struct {
		Salary   string `bson:"salary" json:"-"`
		Position string `bson:"position" json:"-"`
	} `json:"-" bson:"review"`
}

type Benefit struct {
	User struct {
		Address string `json:"address"`
	} `json:"user"`
	RecordId        string `json:"record_id" bson:"_id"`         // Hidden from JSON, visible for BSON
	CompanyId       string `json:"company_id" bson:"company"`    // Hidden from JSON, visible for BSON
	CreatedAt       string `json:"created_at" bson:"created_at"` // Hidden from JSON, visible for BSON
	Position        string `json:"position"`
	Wfh             int    `json:"wfh"`
	HealthInsurance int    `json:"health_insurance"`
	CoursePaid      int    `json:"l_and_d"`
	StockPlan       int    `json:"stock_plan"`
	StockOption     int    `json:"stock_options"`
	AnnualLeave     int    `json:"annual_leave"`
	Review          struct {
		Position        string `bson:"position" json:"-"`
		Wfh             int    `bson:"wfh" json:"-"`
		HealthInsurance int    `bson:"health_insurance" json:"-"`
		CoursePaid      int    `bson:"l_and_d" json:"-"`
		StockPlan       int    `bson:"stock_plan" json:"-"`
		StockOption     int    `bson:"stock_option" json:"-"`
		AnnualLeave     int    `bson:"annual_leave" json:"-"`
	} `json:"-" bson:"review"`
}

type Interview struct {
	User struct {
		Address string `json:"address"`
	} `json:"user"`
	RecordId   string `json:"record_id" bson:"_id"`         // Hidden from JSON, visible for BSON
	CompanyId  string `json:"company_id" bson:"company"`    // Hidden from JSON, visible for BSON
	CreatedAt  string `json:"created_at" bson:"created_at"` // Hidden from JSON, visible for BSON
	Difficulty string `json:"difficulty"`
	Position   string `json:"position"`
	Content    string `json:"content"`
	Title      string `json:"title"`
	Review     struct {
		Difficulty string `bson:"difficulty" json:"-"`
		Position   string `bson:"position" json:"-"`
		Content    string `bson:"content" json:"-"`
		Title      string `bson:"title" json:"-"`
	} `json:"-" bson:"review"`
}
type ByCompany struct {
	Name           string `bson:"name" json:"name"`
	DomainName     string `bson:"domain" json:"id"`
	LogoUrl        string `bson:"logoUrl" json:"logoUrl"`
	Description    string `bson:"description" json:"description"`
	StaffRange     string `bson:"staff_range" json:"staff_range"`
	CountReview    int    `json:"reviewCount" bson:"-"`
	CountInterview int    `json:"jobCount" bson:"-"`
	CountSal       int    `json:"salaryCount" bson:"-"`
	Score          struct {
		Overview struct {
			TotalCount int     `bson:"total_count" json:"-"` // Hidden from JSON, visible for BSON
			TotalScore float32 `bson:"total_score" json:"-"` // Hidden from JSON, visible for BSON
			Rating     float32 `bson:"-" json:"rating"`      // Calculated field for JSON only
		} `bson:"1" json:"overview"`
		Salary struct {
			TotalCount int     `bson:"total_count" json:"-"`
			TotalScore float32 `bson:"total_score" json:"-"`
			Rating     float32 `bson:"-" json:"rating"`
		} `bson:"2" json:"salary"`
		Benefit struct {
			TotalCount int     `bson:"total_count" json:"-"`
			TotalScore float32 `bson:"total_score" json:"-"`
			Rating     float32 `bson:"-" json:"rating"`
		} `bson:"3" json:"benefit"`
		Interview struct {
			TotalCount int     `bson:"total_count" json:"-"`
			TotalScore float32 `bson:"total_score" json:"-"`
			Rating     float32 `bson:"-" json:"rating"`
		} `bson:"4" json:"interview"`
	} `bson:"review_score" json:"review_score"`
}
