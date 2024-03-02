import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";

const Show = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [budgets, setBudgets] = useState([]);
    const [remainingIncome, setRemainingIncome] = useState(0);

    useEffect(() => {
        if (location.state && location.state.budgets && location.state.remainingIncome) {
            setBudgets(location.state.budgets);
            setRemainingIncome(location.state.remainingIncome);
        }
    }, [location.state]);

    useEffect(() => {
        const renderChart = () => {
            const ctx = document.getElementById("expenseChart");
            if (ctx) {
                new Chart(ctx, {
                    type: "pie",
                    data: {
                        labels: budgets.map((budget) => budget.title),
                        datasets: [
                            {
                                label: "Expenses",
                                data: budgets.map((budget) => budget.amount),
                                backgroundColor: budgets.map((budget) => budget.color),
                            },
                        ],
                    },
                });
            } else {
                console.error("Canvas element with ID 'expenseChart' not found");
            }
        };

        renderChart(); // Call the renderChart function after the component is mounted

    }, [budgets]);

    const handleAddBudget = () => {
        navigate("/create");
    };

    return (
        <div className="container-fluid height d-flex flex-column justify-content-center align-items-center bg-gradient bg-dark">
            <div className="card p-4 shadow-lg rounded-3 border-0" style={{ maxWidth: '600px' }}>
                <h1 className="card-title text-center mb-4 text-info"> Your Budget </h1>

                {budgets.length === 0 ? (
                    <div className="text-center">
                        <button className="btn btn-outline-info btn-lg mb-3" onClick={handleAddBudget}>
                            Add a Budget
                        </button>
                    </div>
                ) : (
                    <>
                        <h2 className="text-center mt-3">Budget Summary</h2>
                        <Link className="btn btn-outline-info mb-2 " to={"/create"}>Add Expense</Link>
                        <div className="text-center mb-3">
                            <h2>Remaining Monthly Income: ${remainingIncome}</h2>
                        </div>

                        {/* Render canvas element */}
                        <canvas  id="expenseChart" style={{ maxWidth: '300px', maxHeight: '300px' , backgroundColor:"black", justifyContent: "center" }}></canvas>

                        <h1 className="mb-3">Expenses:</h1>
                        <ul className="list-group mb-4">
                            {budgets.map((budget, index) => (
                                <li key={index} className="list-group-item">
                                    {budget.title}: ${budget.amount} {budget.remainingIncome}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
};

export default Show;
