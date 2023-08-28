import React, { useState } from 'react'
import TollIcon from '@mui/icons-material/Toll';
import { InputAdornment, TextField } from '@mui/material';
import { Button } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';


const SendNftTxnForm = () => {
    const { clientSigner, signer } = useSelector(state => state.connectWalletReducer.user)
    const queryParams = useSearchParams()

    const [tokenFormData, setTokenFormData] = useState({
        title: "",
        description: "",
        address: "",
        amount: 0
    })



    const handleTokenFormData = (event) => {
        const { name, value } = event.target;

        setTokenFormData((prev) => (
            {
                ...prev,
                [name]: value
            }
        ))
    }

    const hanleQuery = async () => {
        try {

            // const mintToken = await clientSigner.execute(
            //     signer,
            //     "osmo1py2y08gssxqp3r4ah9e73qq0qkl4squhy3q7zt0ja4nnrec70c7qyq4l4d",
            //     {
            //         mint: {
            //             recipient: "osmo1cyyzpxplxdzkeea7kwsydadg87357qnahakaks",
            //             amount: "1000"
            //         }
            //     },
            //     "auto"
            // );

            // console.log(mintToken);
            const queryBalance = await clientSigner.queryContractSmart(
                "osmo1py2y08gssxqp3r4ah9e73qq0qkl4squhy3q7zt0ja4nnrec70c7qyq4l4d",
                {
                    balance: {
                        address: "osmo1cyyzpxplxdzkeea7kwsydadg87357qnahakaks"
                    }
                }
            )

            console.log(queryBalance)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async () => {

        try {
            const approvalTxn=await clientSigner.execute(
                signer,
                "osmo1py2y08gssxqp3r4ah9e73qq0qkl4squhy3q7zt0ja4nnrec70c7qyq4l4d",
                {
                    increase_allowance:{
                        spender: queryParams.get("multi_sig"),
                        amount:tokenFormData.amount,
                        expires:undefined
                    }
                },
                "auto"
            )
            const createTokenTransferProposal = await clientSigner.execute(
                signer,
                queryParams.get("multi_sig"),
                {
                    propose: {
                        title: tokenFormData.title,
                        description: tokenFormData.description,
                        msgs: [{
                            wasm: {
                                execute: {
                                    contract_addr: "osmo1py2y08gssxqp3r4ah9e73qq0qkl4squhy3q7zt0ja4nnrec70c7qyq4l4d",
                                    msg: btoa(JSON.stringify({
                                        transfer_from: {
                                            owner: signer,
                                            recipient: tokenFormData?.address,
                                            amount: tokenFormData?.amount
                                        }
                                    })),
                                    funds: []
                                }
                            }
                        }],
                    },
                },
                "auto"
            )
            console.log(createTokenTransferProposal)

        } catch (error) {
            console.log(error)
        }
    }

    console.log(tokenFormData)
    return (
        <div className='flex flex-col my-10 mx-36 gap-4 w-full relative'>
            <div className='w-full'>
                <p className='text-3xl font-bold tracking-wider'>New Transaction</p>
            </div>
            <div className='bg-white flex flex-col p-6 rounded-md gap-6 w-full'>
                <div className='flex gap-3 items-center'>
                    <TollIcon className='text-teal-800 ' />
                    <p className='text-xl font-semibold tracking-wide'>Send tokens</p>
                </div>
                <div className='flex flex-col gap-8'>

                    <TextField name='title' id='title' fullWidth label="Title" variant='outlined' required color='secondary' value={tokenFormData.title} onChange={(e) => handleTokenFormData(e)} />
                    <TextField name='description' id='description' fullWidth label="Description" variant='outlined' value={tokenFormData.description} required color='secondary' onChange={(e) => handleTokenFormData(e)} />
                    <TextField name='address' id='recipientAddress' value={tokenFormData.address} fullWidth label="Recipient address" variant='outlined' color='secondary' required InputProps={{
                        startAdornment: <InputAdornment position="start">base-gor:</InputAdornment>,
                    }} onChange={(e) => handleTokenFormData(e)} />
                    <TextField name='amount' type='Number' id='Amount' fullWidth label="Amount" value={tokenFormData.amount} variant='outlined' required color='secondary' onChange={(e) => handleTokenFormData(e)} />
                </div>
                <div className='flex justify-end'>
                    <Button radius='sm' className='text-white bg-black text-lg font-semibold'
                        onClick={handleSubmit}
                    >Next</Button>

                    <Button radius='sm' className='text-white bg-black text-lg font-semibold'
                        onClick={hanleQuery}
                    >query</Button>

                </div>
            </div>
            <div className='rounded-full text-xs font-semibold bg-white border-1 absolute py-4 px-2 right-3 -top-4 cursor-pointer' onClick={() => dispatch(setActiveComponent(1))}>
                close
            </div>
        </div>
    )
}

export default SendNftTxnForm