import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Tile from './Tile'

const Board = ({ restart, setRestart }) => {
    const rowLength = 4
    const colLength = 4
    const [tiles, setTiles] = useState({1: {1: 2, 2: 4, 3: 16, 4: 16}, 2: {1: 16, 3: 16}, 3: {2: 8}})
    // const [newTiles, setnewTiles] = useState({})
    // var newTiles = {}
    // useEffect(() => {
    //     console.log(JSON.parse(localStorage.getItem("data")))
    //     if (!JSON.parse(localStorage.getItem("data"))) {
    //         setTiles(JSON.parse(localStorage.getItem("data")))
    //     }
    // }, [])
    // useEffect(() => {
    //     localStorage.setItem("data", JSON.stringify(tiles))
    //     console.log(localStorage.getItem("data"))
    // }, [tiles])
    
    useEffect(() => {
        if (restart) {
            setTiles({1: {1: 2, 2: 2, 3: 16}, 2: {1: 16, 3: 16}, 3: {2: 4}})   
            setRestart(false)
        }
        console.log(tiles)
        console.log(restart)
    }, [restart])
    
    const handleKeyDown = (event) => {
        console.log(newTiles)
        console.log(tiles)
        var newTiles = JSON.parse(JSON.stringify(tiles))
        console.log(JSON.parse(JSON.stringify(tiles)))
        console.log(newTiles)
        if (event.key == 'ArrowLeft') {
            console.log(newTiles)
            console.log(tiles)
            Object.keys(newTiles).map((row) => {
                console.log(newTiles[row])
                Object.keys(newTiles[row]).map((col) => {

                    var newCol = parseInt(col)
                    console.log(row, col)
                    while (!Object.keys(newTiles[row]).includes(`${newCol - 1}`) && newCol !== 1) {
                        newCol = newCol - 1
                    }
                    var multip = 1
                    if (newCol !== 1) {
                        if (newTiles[row][newCol - 1] == newTiles[row][col]) {
                            multip = 2
                        }
                    }
                    console.log(newTiles[row])

                    var {[col]: _, ...newRow} = newTiles[row]
                    console.log(newRow)
                    newTiles[row] = {...newRow, [multip > 1 ? newCol - 1  : newCol ]: (newTiles[row][col] * multip)}
                    console.log(newTiles)
                })
            }) 
        }
    if (event.key == 'ArrowRight') {
        Object.keys(newTiles).map((row) => {
            Object.keys(newTiles[row]).reverse().map((col) => {
                var newCol = parseInt(col)
                while (!Object.keys(newTiles[row]).includes(`${newCol + 1}`) && newCol !== colLength) {
                    newCol = newCol + 1
                }
                var multip = 1
                if (newCol !== colLength) {
                    if (newTiles[row][newCol + 1] == newTiles[row][col]) {
                        multip = 2
                    }
                }
                var {[col]: _, ...newRow} = newTiles[row]
                newTiles[row] = {...newRow, [multip > 1 ? newCol + 1  : newCol ]: (newTiles[row][col] * multip)}
            })
        })
    }
    if (event.key == 'ArrowUp') {
        Object.keys(newTiles).map((row) => {
            Object.keys(newTiles[row]).map((col) => {
                var newRow = parseInt(row)
                while (!newTiles[newRow - 1]?.[col] && newRow !== 1) {
                    newRow = newRow - 1
                }
                var multip = 1
                if (newRow !== 1) {
                    if (newTiles[newRow - 1][col] == newTiles[row][col]) {
                        multip = 2
                    }
                }
                var {[col]: _, ...newCol} = newTiles[row]
                newTiles[row] = {...newCol}
                if (!newTiles[multip > 1 ? newRow - 1 : newRow]) {
                    newTiles[multip > 1 ? newRow - 1 : newRow] = {}
                }
                newTiles[multip > 1 ? newRow - 1 : newRow][col] = tiles[row][col] * multip
            })
        })
    }
    if (event.key == 'ArrowDown') {
        Object.keys(newTiles).reverse().map((row) => {
            Object.keys(newTiles[row]).map((col) => {
                var newRow = parseInt(row)
                while (!newTiles[newRow + 1]?.[col] && newRow !== rowLength) {
                    newRow = newRow + 1
                }
                var multip = 1
                if (newRow !== rowLength) {
                    if (newTiles[newRow + 1][col] == newTiles[row][col]) {
                        multip = 2
                    }
                }
                var {[col]: _, ...newCol} = newTiles[row]
                newTiles[row] = {...newCol}
                if (!newTiles[multip > 1 ? newRow + 1 : newRow]) {
                    newTiles[multip > 1 ? newRow + 1 : newRow] = {}
                }
                newTiles[multip > 1 ? newRow + 1 : newRow][col] = tiles[row][col] * multip
            })
        })
    }
        console.log(newTiles)
        setTiles(newTiles)
        return 0
    }
    useEffect(() => {
      console.log(tiles)
    }, [tiles])
    
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => {window.removeEventListener('keydown', handleKeyDown)}
    }, [])
    return (
        <GameBoardContainer>
            {[...Array(4**2)].map((e, i) => {
                    return (<section key={i} className='cell'></section>)
                })}
            {Object.keys(tiles).map((row) => {
                return Object.keys(tiles[row]).map((column) => {
                    return <Tile key={`${row}, ${column}`} value={tiles[row][column]} 
                    gridRow = {`${parseInt(row) } / ${parseInt(row) + 1}`} 
                    gridColumn = {`${parseInt(column)}  / ${parseInt(column) + 1}`} />
                })
            })}
        </GameBoardContainer>
    )
}

const GameBoardContainer = styled.section`
    margin-top: 40px;
    position: relative;
    padding: 15px;
    background-color: #bbada0;
    border-radius: 6px;
    width: 500px;
    height: 500px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(4, 107px);
    grid-template-rows: repeat(4, 107px);
    grid-column-gap: 14.4px;
    grid-row-gap: 14.4px;
    .cell {
        line-height: 107px;
        background-color: rgba(238, 228, 218, 0.35);
        width: 107px;
        height: 107px;
        text-align: center;
        border-radius: 3px;
        font-weight: bold;
        font-size: 55px;
        z-index: 10;
        /* position: absolute; */
    }
    p {
        grid-column: 1 / 2;
    }
`

export default Board