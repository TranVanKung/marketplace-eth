export const COURSE_STATES: any = {
  0: "purchased",
  1: "activated",
  2: "deactivated",
};

export const nomalizeOwnedCourse =
  (web3: any) => (course: any, ownedCourse: any) => {
    return {
      ...course,
      ownedCourseId: ownedCourse?.id,
      proof: ownedCourse?.proof,
      owned: ownedCourse?.owner,
      price: web3?.utils?.fromWei(ownedCourse?.price),
      state: COURSE_STATES[ownedCourse?.state],
    };
  };
