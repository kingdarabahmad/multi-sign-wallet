import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    chainName: "Osmosis",
    chainId:"osmo-test-5"
}

export const selectedChainSlice = createSlice({
    name: "selected Chain",
    initialState,
    reducers: {
        setSelectedChain: (state, action) => {
            state.chainName = action.payload.chainName;
            state.chainId=action.payload.chainId;
            return state;
        }
    }
})

export const { setSelectedChain } = selectedChainSlice.actions

export default selectedChainSlice.reducer