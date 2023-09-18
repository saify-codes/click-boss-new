import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';


export default function Password() {
    const session: any = useSession()
    const [status, setStatus] = useState<response>()
    const { register, handleSubmit, watch, formState: { errors }, } = useForm();
    const changePassword: SubmitHandler<FieldValues> = async (data) => {
        const response = await axios.post('/api/users/update/password', data)
        setStatus(response.data);
    }

    return <>

        {
            session.data?.social_login ?
                <p>change your password through social media account</p>
                :
                <form className='my-5' onSubmit={handleSubmit(changePassword)}>
                    <div className='mx-auto max-w-90 space-y-3'>
                        {status && <div className={`p-4 mb-4 text-white font-bold rounded-lg ${status.status ? 'bg-success' : 'bg-danger'} dark:bg-gray-800 dark:text-blue-400`} role="alert">{status.msg}</div>}
                        <input
                            {...register("currentPassword", { required: true, minLength: 8 })}
                            type="text"
                            placeholder="Current password"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                        {errors.currentPassword?.type === 'required' && <small className='block !mt-0 text-start text-danger'>password is required</small>}
                        {errors.currentPassword?.type === 'minLength' && <small className='block !mt-0 text-start text-danger'>password must be 8 characters</small>}
                        {errors.currentPassword?.type === 'invalid' && <small className='block !mt-0 text-start text-danger'>invalid password</small>}

                        <input
                            {...register("newPassword", { required: true, minLength: 8 })}
                            type="text"
                            placeholder="New password"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                        {errors.newPassword?.type === 'required' && <small className='block !mt-0 text-start text-danger'>password is required</small>}
                        {errors.newPassword?.type === 'minLength' && <small className='block !mt-0 text-start text-danger'>password must be 8 characters</small>}

                        <input
                            {...register("confirmPassword", { required: true, validate: value => value == watch('newPassword') })}
                            type="text"
                            placeholder="Confirm password"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                        {errors.confirmPassword && <small className='block !mt-0 text-start text-danger'>password don&apos;t  match</small>}

                        <button className="w-full inline-flex items-center justify-center rounded-md bg-primary py-4 text-center font-medium text-white hover:bg-opacity-90">Change password</button>
                    </div>
                </form>

        }
    </>
}


type response = {
    status: boolean,
    msg: string,
}