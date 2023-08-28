import React, { useState } from 'react'
import TollIcon from '@mui/icons-material/Toll';
import { InputAdornment, TextField } from '@mui/material';
import { Button } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveComponent } from '@/app/redux/feature/activeComponentSlice';


const UpdateMember = () => {

    const { clientSigner, signer } = useSelector(state => state.connectWalletReducer.user)
    const dispatch=useDispatch()
    const contract=useSearchParams().get('multi_sig')

    const [updateMemberData,setUpdateMemberData]=useState({
        removeMember:"",
        addMember:"",
        weight:""
    })

    const handleMemberUpdate=(event)=>{
        const {name,value}=event.target
        setUpdateMemberData((prev)=>(
            {
                ...prev,
            [name]:value,
            }
        ))
    }

    const queryAdmin=async()=>{
        try {
            const queryTxn=await clientSigner.queryContractSmart(
                "osmo193ac3q76239p0rtllytn384j0f05xt9frkv8p7e280tt0mhm0rysygl9yc",
                {
                    admin:{}
                }
            )
            console.log(queryTxn)   
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit=async()=>{
        const updateMemberTxn=await clientSigner.execute(
            signer,
            "osmo193ac3q76239p0rtllytn384j0f05xt9frkv8p7e280tt0mhm0rysygl9yc",
            {
               update_members:{
                remove:[updateMemberData.removeMember],
                add:[{
                    addr:updateMemberData.addMember,
                    weight:55,
                }]
               } 
            },
            "auto"
        )
    }
    console.log(updateMemberData)
  return (
    <div className='flex flex-col my-10 mx-36 gap-4 w-full relative'>
            <div className='w-full'>
                <p className='text-3xl font-bold tracking-wider'>Update your wallet Member</p>
            </div>
            <div className='bg-white flex flex-col p-6 rounded-md gap-6 w-full'>
                <div className='flex gap-3 items-center'>
                    <TollIcon className='text-teal-800 ' />
                    <p className='text-xl font-semibold tracking-wide'>Update Member</p>
                </div>
                <div className='flex flex-col gap-8'>

                    <TextField name='removeMember' onChange={(e)=>handleMemberUpdate(e)} value={updateMemberData.removeMember} id='removeAddress' fullWidth label="Remove Member" variant='outlined' color='secondary' required InputProps={{
                        startAdornment: <InputAdornment position="start">base-gor:</InputAdornment>,
                    }}/>
                    <TextField name='addMember' onChange={(e)=>handleMemberUpdate(e)} value={updateMemberData.addMember} id='addAddress' fullWidth label="Add Member" variant='outlined' color='secondary' required InputProps={{
                        startAdornment: <InputAdornment position="start">base-gor:</InputAdornment>,
                    }}/>
                    <TextField name='weight' type='Number' id='weight' fullWidth label="New Member Weight" value={updateMemberData.weight} variant='outlined' required color='secondary' onChange={(e) => handleMemberUpdate(e)} />
                </div>
                <div className='flex justify-end'>
                    <Button radius='sm' className='text-white bg-black text-lg font-semibold' onClick={
                        handleSubmit
                    }
                    >update</Button>
                    <Button onClick={queryAdmin}>queryAdmin</Button>
                </div>
            </div>
            <div className='rounded-full text-xs font-semibold bg-white border-1 absolute py-4 px-2 right-3 -top-4 cursor-pointer' onClick={() => dispatch(setActiveComponent(1))}>
                close
            </div>
        </div>
  )
}

export default UpdateMember