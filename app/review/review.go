package review

type OverView struct {
	User struct {
		Address string `json:"address"`
	} `json:"user"`
	RecordId  string `json:"record_id" bson:"_id"`         // Hidden from JSON, visible for BSON
	CompanyId string `json:"company_id" bson:"company"`    // Hidden from JSON, visible for BSON
	CreatedAt string `json:"created_at" bson:"created_at"` // Hidden from JSON, visible for BSON
	Position  string `json:"position"`
	Title     string `json:"title"`
	Rating    int    `json:"rating"`
	Content   string `json:"content"`
	Review    struct {
		Position string `bson:"position"`
		Title    string `bson:"title"`
		Rating   int    `bson:"rating"`
		Content  string `bson:"content"`
	} `json:"-"`
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
		Salary   string `bson:"salary"`
		Position string `bson:"position"`
	} `json:"-"`
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
	StockOption     int    `json:"stock_option"`
	AnnualLeave     int    `json:"annual_leave"`
	Review          struct {
		Position        string `bson:"position"`
		Wfh             int    `bson:"wfh"`
		HealthInsurance int    `bson:"health_insurance"`
		CoursePaid      int    `bson:"l_and_d"`
		StockPlan       int    `bson:"stock_plan"`
		StockOption     int    `bson:"stock_option"`
		AnnualLeave     int    `bson:"annual_leave"`
	} `json:"-"`
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
		Difficulty string `bson:"difficulty"`
		Position   string `bson:"position"`
		Content    string `bson:"content"`
		Title      string `bson:"title"`
	} `json:"-"`
}

type ByCompany struct {
	Name        string `bson:"name" json:"name"`
	DomainName  string `bson:"domain" json:"id"`
	Description string `bson:"description" json:"description"`
	StaffRange  string `bson:"staff_range" json:"staff_range"`
	Score       struct {
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
