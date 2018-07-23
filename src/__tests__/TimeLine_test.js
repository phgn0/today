import TimeLine from "../TimeLine/TimeLine";

let _real_date = Date;
function mockDate(constantDate) {
    /*eslint no-global-assign:off*/
    Date = class extends Date {
        constructor() {
            super();
            return constantDate;
        }
    };
}

function unMockDate() {
    /*eslint no-global-assign:off*/
    Date = _real_date;
}

describe("The TimeLine component", () => {
    describe("correctly calculates dates for the next 7 days", () => {
        mockDate(new Date("2018-07-26T14:41:20"));

        const data = TimeLine.generateNextWeek();
        expect(data).toEqual([
            { date: "26.6.2018", dayName: "Today" },
            { date: "27.6.2018", dayName: "Friday" },
            { date: "28.6.2018", dayName: "Saturday" },
            { date: "29.6.2018", dayName: "Sunday" },
            { date: "30.6.2018", dayName: "Monday" },
            { date: "31.6.2018", dayName: "Tuesday" },
            { date: "1.7.2018", dayName: "Wednesday" }
        ]);

        unMockDate();
    });
});
