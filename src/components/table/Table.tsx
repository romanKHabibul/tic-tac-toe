"use client"

import React, { useState } from 'react'
import cl from './Table.module.scss'

const Table = () => {

    const SYMBOL_X = "x"
    const SYMBOL_O = "o"
    const [currentStep, setCurrentStep] = useState(SYMBOL_X)
    const [winnerSequere, setWinnerSequere] = useState<number[]>()
    const [cells, setCells] = useState([null,null,null,null,null,null,null,null,null])

    const getCellColor = (cell: string | null) => {
        if(cell === SYMBOL_X){
            return "red"
        } else {
            return 'green'
        }
    }

    const computeWinner = (cells: any) => {
        const lines = [
            [1,2,3],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        for(let i = 0; i < lines.length; i++){
            const [a,b,c] = lines[i]
            if(
                cells[a] &&
                cells[a] === cells[b] &&
                cells[a] === cells[c]
            ){
                return [a,b,c]
            } 
        }
    }

    console.log(cells)
    console.log(winnerSequere)

    const handleClick = (index: number) => {
        if(cells[index]){
            return;
        }
        const copied = cells.slice()
        //@ts-ignore
        copied[index] = currentStep

        const winner = computeWinner(copied)
        
        setCells(copied)
        currentStep === SYMBOL_X ? setCurrentStep(SYMBOL_O) : setCurrentStep(SYMBOL_X)
        setWinnerSequere(winner)
    }

    return (
       <div className={cl.game}>
            <div className={cl.gameTitle}>
                Текущий ход - {currentStep}
            </div>
            <div className={cl.gameField}>
                {cells.map((cell, index) => {
                    const isWinner = winnerSequere?.includes(index)
                    console.log(isWinner)
                    return <button 
                            onClick={() => 
                            handleClick(index)} 
                            className={isWinner ? cl.cell + ' ' + cl.cellWin : cl.cell} 
                            key={index}
                            >
                        <span style={{color: getCellColor(cell)}}>
                            {cell}
                        </span>
                    </button>
                })}
            </div>
       </div>
    )
}

export default Table
