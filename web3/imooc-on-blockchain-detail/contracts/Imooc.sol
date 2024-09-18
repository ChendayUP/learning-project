// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract CourseList {
    address public immutable ceo;
    address[] public courses;
    event Log(string);

    constructor() {
        ceo = msg.sender;
    }

    function createCourse(
        string memory _name,
        string memory _content,
        uint _target,
        uint _fundingPrice,
        uint _price,
        string memory _img
    ) public {
        emit Log('createCourse')
        address newCourse = address(new Course(ceo,
                msg.sender,
                _name,
                _content,
                _target,
                _fundingPrice,
                _price,
                _img
            ));
        courses.push(newCourse);
    }

    function getCourses() public view returns (address[] memory) {
        return courses;
    }

    function removeCourse(uint _index) public {
        require(msg.sender == ceo, "Only CEO can remove courses");
        require(_index < courses.length, "Invalid index");

        courses[_index] = courses[courses.length - 1];
        courses.pop();
    }

    function isCeo() public view returns (bool) {
        return msg.sender == ceo;
    }
}

contract Course {
    address public immutable owner;
    address public immutable ceo;

    string public name;
    string public content;
    uint public immutable target;
    uint public immutable fundingPrice;
    uint public immutable price;
    string public img;
    string public video;
    bool public isOnline;
    uint public count;
    mapping(address => uint) public users;

    constructor(
        address _ceo,
        address _owner,
        string memory _name,
        string memory _content,
        uint _target,
        uint _fundingPrice,
        uint _price,
        string memory _img
    ) {
        ceo = _ceo;
        owner = _owner;
        name = _name;
        content = _content;
        target = _target;
        fundingPrice = _fundingPrice;
        price = _price;
        img = _img;
    }

    function buy() public payable {
        require(users[msg.sender] == 0, "User has already purchased");
        require(
            msg.value == (isOnline ? price : fundingPrice),
            "Incorrect payment amount"
        );

        users[msg.sender] = msg.value;
        count++;

        if (target <= count * fundingPrice && !isOnline) {
            isOnline = true;
            payable(owner).transfer(address(this).balance);
        } else if (isOnline) {
            uint ceoShare = msg.value / 10;
            payable(ceo).transfer(ceoShare);
            payable(owner).transfer(msg.value - ceoShare);
        }
    }

    function addVideo(string memory _video) public {
        require(msg.sender == owner, "Only owner can add video");
        require(isOnline, "Course must be online");
        video = _video;
    }

    function getDetail()
        public
        view
        returns (
            string memory,
            string memory,
            uint,
            uint,
            uint,
            string memory,
            string memory,
            uint,
            bool,
            uint
        )
    {
        uint role = (msg.sender == owner) ? 0 : (users[msg.sender] > 0 ? 1 : 2);
        return (
            name,
            content,
            target,
            fundingPrice,
            price,
            img,
            video,
            count,
            isOnline,
            role
        );
    }
}
