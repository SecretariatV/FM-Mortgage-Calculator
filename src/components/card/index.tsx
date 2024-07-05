import S from "./index.module.scss";
import { PiCalculatorFill } from "react-icons/pi";
import banner from "@assets/illustration-empty.svg";
import { useState } from "react";
import clsx from "clsx";

export const Card = () => {
  const [amount, setAmount] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  const [rate, setRate] = useState<number>(0);
  const [radio, setRadio] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [monthly, setMonthly] = useState<number>(0);
  const [totalMonthly, setTotalMonthly] = useState<number>(0);

  const calculateRepayment = () => {
    if (radio === "repay") {
      const monthlyInterestRate = rate / 100 / 12;
      const monthlyPayments = year * 12;
      const M =
        (amount *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, monthlyPayments)) /
        (Math.pow(1 + monthlyInterestRate, monthlyPayments) - 1);
      setMonthly(M);
      setTotalMonthly(M * 12 * year);
    }
  };

  const handleCheck = () => {
    let check = true;
    let newErrors: { [key: string]: string } = {};

    if (amount === 0) {
      check = false;
      newErrors["amount"] = "This field is required";
    }

    if (!year || year === 0) {
      check = false;
      newErrors["year"] = "This field is required";
    }

    if (!rate) {
      check = false;
      newErrors["rate"] = "This field is required";
    }

    if (!radio) {
      check = false;
      newErrors["radio"] = "This field is required";
    }

    setErrors(newErrors);

    if (check) {
      calculateRepayment();
    }
  };

  const handleClear = () => {
    setAmount(0);
    setYear(0);
    setRate(0);
    setRadio("");
    setErrors({});
    setMonthly(0);
  };

  const formatNumber = (number: number) =>
    Intl.NumberFormat("en-UK", {
      style: "currency",
      currency: "GBP",
    }).format(number);

  return (
    <div className={S.body}>
      <div className={S.setting}>
        <div className={S.header}>
          <h1>Mortgage Calculator</h1>
          <button onClick={handleClear}>Clear all</button>
        </div>
        <div className={S.main}>
          <div className={S.panel}>
            <label htmlFor="amount">Mortgage Amount</label>
            <div className={clsx(S.amount, errors.amount && S.error)}>
              <input
                type="number"
                name="amount"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
            {errors.amount && <p className={S.errorAlam}>{errors.amount}</p>}
          </div>
          <div className={S.limit}>
            <div className={S.panel}>
              <label htmlFor="year">Mortgage Term</label>
              <div className={clsx(S.year, errors.year && S.error)}>
                <input
                  type="number"
                  name="year"
                  id="year"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                />
              </div>
              {errors.year && <p className={S.errorAlam}>{errors.year}</p>}
            </div>
            <div className={S.panel}>
              <label htmlFor="rate">Interest Rate</label>
              <div className={clsx(S.rate, errors.rate && S.error)}>
                <input
                  type="number"
                  name="rate"
                  id="rate"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                />
              </div>
              {errors.rate && <p className={S.errorAlam}>{errors.rate}</p>}
            </div>
          </div>
          <div className={S.panel}>
            <label htmlFor="year">Mortgage Type</label>
            <div className={S.radio}>
              <label htmlFor="repay" onClick={() => setRadio("repay")}>
                <input
                  type="radio"
                  checked={radio === "repay"}
                  onChange={() => setRadio("repay")}
                />
                <span />
                Repayment
              </label>
              <label htmlFor="inter" onClick={() => setRadio("inter")}>
                <input
                  type="radio"
                  checked={radio === "inter"}
                  onChange={() => setRadio("inter")}
                />
                <span />
                Interest Only
              </label>
              {errors.radio && <p className={S.errorAlam}>{errors.radio}</p>}
            </div>
          </div>
        </div>
        <button className={S.calcu} onClick={handleCheck}>
          <PiCalculatorFill size={20} className={S.icon} />
          <span>Calculate Repayments</span>
        </button>
      </div>
      <div className={clsx(S.view, monthly !== 0 && S.show)}>
        {monthly !== 0 ? (
          <>
            <h2>Your results</h2>
            <p>
              Your results are shown below based on the information you
              provided. To adjust the results, edit the form and click
              "calculate repayments" again.
            </p>
            <div className={S.panel}>
              <p>Your monthly repayments</p>
              <span>{formatNumber(monthly)}</span>
              <div className="line" />
              <div className={S.total}>
                <p>Total you'll repay over the term</p>
                <span>{formatNumber(totalMonthly)}</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <img src={banner} alt="" />
            <h2>Results shown here</h2>
            <p>
              Complete the form and click "calculate repayments" to see what
              yoour monthly repayments would be.
            </p>
          </>
        )}
      </div>
    </div>
  );
};
