// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/access/Ownable.sol";
import {Collection} from "./Collection.sol";

contract Review is Ownable{

    struct Company {
        uint256[4] totalCount;
        uint256[4] average;
        string name;
    }

    Collection collection;

    modifier onlyCollectionHolder() {
        require(collection.balanceOf(msg.sender) > 0, "Not a token holder");
        _;
    }

    mapping(string => uint256) public companyIndex;
    mapping(string => bool) public existCompany;
    mapping(uint256 => Company) public companies;
    uint256 public companyCount;

    event fileSubmitReview(bytes32 indexed data, uint256[4] rate); 
    event fileNewComapany(bytes32 indexed data);

    constructor(address _collection) Ownable(msg.sender) {
        collection = Collection(_collection);
    }

    /**
     * @dev This function allows the owner to submit a review for a company.
     * It first checks if the company exists and creates a new company if it doesn't.
     * Then, it ensures that each rating is within the specified range (0 to 5 * 10^18).
     * If valid, it updates the average rating for each category and increments the total count.
     * The function emits a `fileSubmitReview` event to log the review submission.
     * @param _name The name of the company being reviewed.
     * @param _rate The ratings for the company in 4 categories (each rating is a uint256).
     * @param _data A unique identifier (hashed) for the review data.
     */
    function submitReview(string memory _name, uint256[4] memory _rate, bytes32 _data) public onlyCollectionHolder{
        if (!existCompany[_name]) {
            newCompany(_name, _data);
        }

        require(existCompany[_name], "This company does not exist");
        for (uint i = 0; i < 4; i++) {
            require(_rate[i] >= 0, "Rate has to be positive");
            require(_rate[i] <= 5*(10**18), "Rate has to be in range");            
        }

        collection.burn();

        uint256 index = companyIndex[_name];
        Company storage company = companies[index];
        for (uint i = 0; i < 4; i++) {
            if (_rate[i] >= 1*(10**18)) {
                company.average[i] = ((company.average[i] * company.totalCount[i]) + _rate[i]) / (company.totalCount[i] + 1);
                company.totalCount[i]++;           
            }
        }


        emit fileSubmitReview(_data, _rate);
    }

    /**
     * @dev This function is used to create a new company when it's first reviewed.
     * It initializes the company with 0 counts and averages for each rating category.
     * It also sets the company's name and increments the company count.
     * The function emits a `fileNewComapany` event to log the creation of the new company.
     * @param _name The name of the company to be created.
     * @param _data A unique identifier (hashed) for the company data.
     * @return company The newly created `Company` struct.
     */
    function newCompany(string memory _name, bytes32 _data) internal onlyCollectionHolder returns (Company memory company) {
        require(!existCompany[_name], "This name was taken");
        Company memory newComp = Company({
            totalCount: [uint256(0),0,0,0],
            average: [uint256(0),0,0,0],
            name: _name
        });
        companies[companyCount] = newComp;
        existCompany[_name] = true;
        companyCount++;
        emit fileNewComapany(_data);
        company = newComp;
    }

    /**
     * @dev This function allows anyone to retrieve information about a company based on its index.
     * It returns the company's name, the total count of reviews in each category, and the average ratings.
     * @param index The index of the company whose details are being fetched.
     * @return (string, uint256[4], uint256[4]) The company's name, total review counts, and average ratings.
     */
    function getCompany(uint256 index) public view returns (string memory, uint256[4] memory, uint256[4] memory) {
        Company storage company = companies[index];
        return (company.name, company.totalCount, company.average);
    }

}
