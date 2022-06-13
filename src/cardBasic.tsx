import React, { useState, useEffect } from "react"

//materials
import AttachMoneySharpIcon from "@mui/icons-material/AttachMoneySharp"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import TargetMonth from "@components/countMonthes"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import NumberFormat, { InputAttributes } from "react-number-format"

import TextField from "@mui/material/TextField"
import { IconButton } from "@mui/material"
import "./card.css"

export default function BasicCard() {
    //get products names
    let [name, setName] = useState("")

    const productName1 = () => {
        return setName((name) => "Cash Loan")
    }

    const productName2 = () => {
        return setName((name) => "Automobile Loan")
    }

    const productName3 = () => {
        return setName((name) => "Housing Loan")
    }

    //setting months settings
    let [count, setCount] = useState(12)

    let [minTenure, setMinTenure] = useState(12)
    const getMinTenure = () => {
        setCount((count) =>
            Number(data.filter((item) => item.name == name).map((item) => Number(item.min_tenure)))
        )
        setMinTenure((minTenure) =>
            data.filter((item) => item.name == name).map((item) => Number(item.min_tenure))
        )
    }

    let [maxTenure, setMaxTenure] = useState(12)
    const getMaxTenure = () => {
        setMaxTenure((maxTenure) =>
            data.filter((item) => item.name == name).map((item) => Number(item.max_tenure))
        )
    }

    const increment = () => {
        if (count < maxTenure) setCount((count) => count + 1)
    }

    const decrement = () => {
        if (count > minTenure) setCount((count -= 1))
    }

    // fetching data from products.json

    const [data, setData] = useState([])

    const getData = () => {
        fetch("products.json", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
            .then(function (response) {
                return response.json()
            })
            .then(function (myJson) {
                setData(myJson)
            })
    }
    useEffect(() => {
        getData(), productName1(), productName2(), productName3(), minimum(), getMinTenure()
    }, [])

    //get min and max amounts
    let [min, setMin] = useState(0)
    let [max, setMax] = useState(0)

    const minimum = () => {
        setMin((min) =>
            data.filter((item) => item.name == name).map((item) => Number(item.min_amount))
        )
    }

    const maximum = () => {
        setMax((max) =>
            data.filter((item) => item.name == name).map((item) => Number(item.max_amount))
        )
    }

    //get input amount value
    const [values, setValues] = React.useState<State>({
        numberformat: "25000",
    })

    let [loanAmount, setLoanAmount] = useState("")
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
            min: min,
            max: max,
        })
        setLoanAmount((loanAmount) => event.target.value)
    }

    interface State {
        numberformat: string
    }

    //get interest
    let [interest, setInterest] = useState("")

    const getInterest = () => {
        setInterest((interest) =>
            data.filter((item) => item.name == name).map((item) => item.interest)
        )
    }

    //calculate total amount
    let [totalAmount, setTotalAmount] = useState(0)
    const calculateTotalAmount = () => {
        setTotalAmount((totalAmount) => loanAmount + loanAmount * interest)
    }

    //setting number format
    interface CustomProps {
        onChange: (event: { target: { name: string; value: Number } }) => void
        name: string
    }

    const NumberFormatCustom = React.forwardRef<NumberFormat<InputAttributes>, CustomProps>(
        function NumberFormatCustom(props, ref) {
            const { onChange, ...other } = props

            return (
                <NumberFormat
                    {...other}
                    getInputRef={ref}
                    onValueChange={(values) => {
                        onChange({
                            target: {
                                name: props.name,
                                value: Math.max(min, Math.min(max, Number(values.value))),
                            },
                        })
                    }}
                    thousandSeparator
                    isNumericString
                    prefix="$  "
                />
            )
        }
    )

    //set min & max for input loan
    function handleMonths(e) {
        setCount((count) => Math.max(minTenure, Math.min(maxTenure, Number(e.target.value))))
    }

    //card content
    return (
        <Card
            sx={{
                minWidth: "360px",
            }}
            className="card">
            <CardContent>
                <div className="cardContent">
                    {/* icon loan */}
                    <div className="iconsloan">
                        <IconButton
                            sx={{
                                "&:hover": {
                                    backgroundColor: "#374baa",
                                },
                                "&:active": {
                                    boxShadow: "none",
                                    backgroundColor: "#374baa",
                                    borderColor: "#1b2555",
                                },
                                "&:focus": {
                                    boxShadow: "0 0 0 0.02rem rgba(0,123,255,.5)",
                                },

                                marginTop: "18px",
                                marginBottom: "16px",
                            }}
                            onClick={() => {
                                productName2()
                                minimum()
                                maximum()
                                getInterest()
                                getMinTenure()
                                getMaxTenure()
                                calculateTotalAmount()
                            }}>
                            <img
                                src={data
                                    .filter((item) => item.name == "Automobile Loan")
                                    .map((item) => item.image)}
                                width="86px"
                            />
                        </IconButton>

                        <IconButton
                            sx={{
                                "&:hover": {
                                    backgroundColor: "#9e959a",
                                },
                                "&:active": {
                                    boxShadow: "none",
                                    backgroundColor: "#9e959a",
                                    borderColor: "#9e959a",
                                },
                                "&:focus": {
                                    boxShadow: "0 0 0 0.02rem rgba(0,123,255,.5)",
                                },
                                marginRight: "15px",
                                marginLeft: 0,
                                marginTop: "27px",
                                marginBottom: "24px",
                            }}
                            onClick={() => {
                                minimum()
                                productName3()
                                maximum()
                                getInterest()
                                getMinTenure()
                                getMaxTenure()
                                calculateTotalAmount()
                            }}>
                            <img
                                src={data
                                    .filter((item) => item.name == "Housing Loan")
                                    .map((item) => item.image)}
                                width="74px"
                                height="69px"
                            />
                        </IconButton>

                        <IconButton
                            sx={{
                                "&:hover": {
                                    backgroundColor: "#aaaaaa",
                                },
                                "&:active": {
                                    boxShadow: "none",
                                    backgroundColor: "aaaaaa",
                                    borderColor: "black",
                                },
                                "&:focus": {
                                    boxShadow: "0 0 0 0.02rem rgba(0,123,255,.5)",
                                },
                                marginLeft: 0,
                                marginTop: "27px",
                                marginBottom: "24px",
                            }}
                            onClick={() => {
                                minimum()
                                productName1()
                                maximum()
                                getInterest()
                                getMinTenure()
                                getMaxTenure()
                                calculateTotalAmount()
                            }}>
                            <img
                                src={data
                                    .filter((item) => item.name == "Cash Loan")
                                    .map((item) => item.image)}
                                width="69px"
                            />
                        </IconButton>
                    </div>
                    <div className="inputs">
                        <div className="inputContainer">
                            <span className="subtitle">Loan amount</span>

                            {/* input loan amount */}
                            <Box
                                sx={{
                                    "& > :not(style)": {
                                        m: 1,
                                        margin: "none",
                                    },
                                }}>
                                <TextField
                                    value={values.numberformat}
                                    onChange={handleChange}
                                    name="numberformat"
                                    id="formatted-numberformat-input"
                                    InputProps={{
                                        inputComponent: NumberFormatCustom as any,
                                    }}
                                    sx={{ fontWeight: "bold" }}
                                    className="inputLoan"
                                />
                            </Box>
                        </div>
                        <div className="inputContainer">
                            <span className="subtitle">Number of months</span>
                            <div className="counter">
                                <Button
                                    onClick={decrement}
                                    onFocus={decrement}
                                    sx={{ color: "#afbbc4" }}>
                                    {" "}
                                    <KeyboardArrowLeftIcon />{" "}
                                </Button>
                                <TextField
                                    value={count}
                                    onChange={handleMonths}
                                    name="tenure"
                                    id="tenure"
                                    sx={{ fontWeight: "bold", width: "10%" }}
                                    variant="standard"
                                />

                                <Button
                                    onClick={increment}
                                    onFocus={increment}
                                    sx={{ color: "#afbbc4" }}>
                                    {" "}
                                    <KeyboardArrowRightIcon />{" "}
                                </Button>
                            </div>
                        </div>
                    </div>
                    {/* results section */}
                    <div className="result">
                        <div className="monthlyAmount">
                            <span className="monthly">Monthly amount</span>
                            <div className="amount">
                                <AttachMoneySharpIcon fontSize="large" sx={{ margin: 0 }} />
                                <span style={{ marginLeft: "-10px" }}>
                                    {" "}
                                    {parseFloat(loanAmount / count).toFixed(0)}{" "}
                                </span>
                            </div>
                        </div>
                        {/* description */}
                        <div className="description">
                            <p>
                                Your planning <strong> {count} monthly </strong> to reach your{" "}
                                <strong> ${loanAmount} </strong> goal by{" "}
                                <strong>
                                    <TargetMonth count={count} />
                                </strong>
                                . The total amount loaned will be <strong> ${totalAmount} </strong>
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
            {/* action button */}
            <CardActions sx={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#1B31A8",
                        width: "320px",
                        height: "56px",
                        borderRadius: "32px",
                        marginBottom: "40px",

                        "&:hover": {
                            backgroundColor: "#1a265e",
                        },
                        textTransform: "none",
                        fontSize: "16px",
                        fontWeight: "600px",
                    }}>
                    Apply now
                </Button>
            </CardActions>
        </Card>
    )
}
