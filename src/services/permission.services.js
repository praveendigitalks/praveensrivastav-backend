
import Permission from "./../models/permission.model.js";
export const createPermission = async(data) =>{
    return await Permission.create(data);
}

export const getPermission  = async() => {
    return await Permission.find()
};

export const getPermissionByid = async(id) => {
    return Permission.findById(id)
};

export const updatePermission = async(id , data) => {
    return Permission.findByIdAndUpdate(id, data, {new : true});
}

export const deletePermission = async(id) => {
    return Permission.findByIdAndRemove(id)
}