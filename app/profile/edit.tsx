import { useSession } from 'next-auth/react'
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

export default function Edit({ toggle }: { toggle: () => void }) {
    const session: any = useSession()
    const [user, setUser] = useState<any>({})
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const changeName: SubmitHandler<FieldValues> = async (data) => {
        try {
            const response = await axios.post('/api/users/update/profile', data)
            if (response.status == 200) {
                reloadSession()
            }
            toggle()
        } catch (error) {
            alert("something went wrong")
        }
    }
    useEffect(() => {
        setUser(session.data)
    }, [session])

    return <>

        <form className="my-2 flex items-start justify-center gap-2" onSubmit={handleSubmit(changeName)}>
            <div>
                <input
                    {...register("name", { required: true, minLength: 3 })}
                    type="text"
                    placeholder="Enter name"
                    className="rounded-lg border-[1.5px] border-stroke bg-transparent py-1 px-2 font-medium text-sm outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                    defaultValue={user.name}
                />
                {errors.name && <small className="block text-start text-danger">name must be 3 charactes</small>}
            </div>
            <button className="inline-flex items-center justify-center rounded-md bg-primary py-1 px-3 text-center text-sm text-white hover:bg-opacity-90">Save</button>
        </form>
    </>
}

const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
};