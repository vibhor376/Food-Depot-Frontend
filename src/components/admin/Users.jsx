import React, { useEffect } from 'react'
import me from "../../assets/dp.png"
import { useDispatch, useSelector } from 'react-redux';
import { getAdminUsers } from '../../redux/actions/admin';
import { toast } from 'react-hot-toast';
const Users = () => {
    // const arr = [1, 2, 3, 4];
    const dispatch = useDispatch();
    const { loading, users, error } = useSelector(state => state.admin);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: "clearError" });
        }
        dispatch(getAdminUsers());
    }, [dispatch, error]);

    if (loading === true) {
        return <h1 align="center" style={{ height: "100vh", marginTop: "50vh" }}>Loading....</h1>
    };

    return (
        <section className='tableClass'>
            {users && <main>
                <table>
                    <thead>
                        <tr>
                            <th>User Id</th>
                            <th>Name</th>
                            <th>Photo</th>
                            <th>Role</th>
                            <th>Since</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((i) => (
                                <tr key={i._id}>
                                    <td>#{i._id}</td>
                                    <td>{i.name}</td>
                                    <td>
                                        {i.role === 'admin' ? <img src={me} alt={i.name} /> : "NA"}
                                    </td>
                                    <td>{i.role}</td>
                                    <td>{i.createdAt.split("T")[0]}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </main>}
        </section>
    )
}

export default Users