export default function targetMonth({ count }) {
    const months = [
        "January ",
        "February ",
        "March ",
        "April ",
        "May ",
        "June ",
        "July ",
        "August ",
        "Septembr ",
        "October ",
        "November ",
        "December ",
    ]

    let d = new Date("June 2022")
    d.setMonth(d.getMonth() + count)
    let index = d.getMonth()
    return months[index] + d.getFullYear()
}
