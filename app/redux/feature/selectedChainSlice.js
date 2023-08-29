import { createSlice } from "@reduxjs/toolkit"

const initialState = JSON.parse(localStorage.getItem("selectChain")) || { chainName:"",chainId:""}

export const selectedChainSlice = createSlice({
    name: "selected Chain",
    initialState,
    reducers: {
        setSelectedChain: (state, action) => {
            state.chainName = action.payload.chainName;
            state.chainId=action.payload.chainId;
            localStorage.setItem("selectChain",JSON.stringify(state))
            return state;
        }
    }
})

export const { setSelectedChain } = selectedChainSlice.actions

export default selectedChainSlice.reducer