import Contact from "../models/contact.model.js";

export const createContact = async (tenantId, data) => {
  if (data.socialprofileSchema) {
    try {
      data.socialprofileSchema = JSON.parse(data.socialprofileSchema);
    } catch (e) {
      data.socialprofileSchema = [];
    }
  }
  return Contact.create({ ...data,tenantId });
};
export const getContact = async (tenantId) => {
  return Contact.find({ tenantId });
};
// export const getByIdContact = async (id, tenantId) => {
//   return Contact.findById({ id, tenantId });
// };
// service/contact.service.ts (or wherever your DB functions live)

// Get single contact by id, scoped to tenant
export const getByIdContact = async (id, tenantId) => {
  // Correct: use findOne with _id + tenantId filter
  return Contact.findOne({ _id: id, tenantId });
};

// export const updateContact = async (id, tenantId, data) => {
//   return Contact.findByIdAndUpdate({ id, tenantId, data });
// };
export const updateContact = async (
  id,
  tenantId,
  data
) => {
  // If socialprofileSchema comes from FormData, it will be a JSON string
  if (data.socialprofileSchema) {
    if (typeof data.socialprofileSchema === 'string') {
      try {
        data.socialprofileSchema = JSON.parse(data.socialprofileSchema);
      } catch (e) {
        data.socialprofileSchema = [];
      }
    }
  }

  // Correct usage: findOneAndUpdate with _id + tenantId filter
  return Contact.findOneAndUpdate(
    { _id: id, tenantId }, // filter
    data,                  // update data
    { new: true }          // return updated doc
  );
};
export const deleteContact = async (id, tenantId) => {
  return Contact.findByIdAndDelete({ id, tenantId });
};
