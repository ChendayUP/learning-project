const CourseList = artifacts.require("CourseList");

module.exports = function (deployer) {
  deployer.deploy(CourseList);
};