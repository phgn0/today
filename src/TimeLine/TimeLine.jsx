import React, { Component } from "react";
// import PropTypes from "prop-types";

import DailyTodos from "./DailyTodos.jsx";

/**
 * Displays a timeline composed of one week of days, each with individual tasks
 * that are planned for this day.
 */
class TimeLine extends Component {
    constructor(props) {
        super(props);

        this.days = this.generateNextWeek();
    }

    /** Generate a list of the next 7 days, each with a weekday-name, and its date */
    generateNextWeek() {
        const week_words = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];
        const now = new Date(Date.now());
        const days = [];
        for (let i = 0; i < 7; i++) {
            days.push({
                date:
                    now.getDate() +
                    "." +
                    now.getMonth() +
                    "." +
                    now.getFullYear(),
                dayName: week_words[now.getDay()]
            });
            // go 24 hours forward
            now.setDate(now.getDate() + 1);
        }

        days[0].dayName = "Today";
        return days;
    }

    render() {
        return (
            <main className="page">
                {this.days.map(dayData => {
                    return <DailyTodos key={dayData.date} {...dayData} />;
                })}
            </main>
        );
    }
}
TimeLine.propTypes = {};

export default TimeLine;
