// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CourseMarketplace {
    enum State {
        Purchased,
        Activated,
        Deactivated
    }

    struct Course {
        uint256 id;
        uint256 price;
        bytes32 proof;
        address owner;
        State state;
    }

    // mapping of courseHash to Course data
    mapping(bytes32 => Course) private ownedCourses;

    // mapping of courseId to courseHash
    mapping(uint256 => bytes32) private ownedCourseHash;

    // number of all courses + id of ther course
    uint256 private totalOwnedCourse;

    function purchaseCourse(bytes16 courseId, bytes32 proof) external payable {
        // course id - 10
        bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender));
        uint256 id = totalOwnedCourse++;
        ownedCourseHash[id] = courseHash;
        ownedCourses[courseHash] = Course({
            id: id,
            price: msg.value,
            proof: proof,
            owner: msg.sender,
            state: State.Purchased
        });
    }
}
