import Role from "../models/role.model.js";


export const createRole = async(data) =>{
    return await Role.create(data);
}

export const getRole = async() => {
    return await Role.find().populate('permission')
    ;
}

export const getRoleById = async(id) => {
    return await Role.findById(id);
};

export const updateRole = async(id , data) => {
    return await Role.findByIdAndUpdate(id, data)
};

export const deleteRole = async(id) => {
    return await Role.findByIdAndDelete(id)
}