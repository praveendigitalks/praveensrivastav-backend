import About from "../models/about.model.js";

export const createAbout = async (tenantId, data) => {
  // 🔥 PARSE WEBSKILLS JSON STRING
  if (data.webskills) {
    try {
      data.webskills = JSON.parse(data.webskills);
    } catch (e) {
      console.error("Invalid webskills JSON:", e);
      data.webskills = [];
    }
  } else {
    data.webskills = [];
  }

  if (data.priorskills) {
    try {
      data.priorskills = JSON.parse(data.priorskills);
    } catch (e) {
      data.priorskills = [];
    }
  }
  if (data.companyProjects) {
    try {
      data.companyProjects = JSON.parse(data.companyProjects);
    } catch (e) {
      data.companyProjects = [];
    }
  }

  // ✅ Convert other fields
  if (data.dob) data.dob = new Date(data.dob);
  if (data.phone) data.phone = Number(data.phone);

  // console.log('Processed data:', data); // Debug

  return await About.create({
    ...data, // 🔥 spread fields at root
    tenantId,
  });
};

export const updateAbout = async (id, tenantId, data) => {
  // 🔥 Existing parsing
  if (data.webskills) {
    try {
      data.webskills = JSON.parse(data.webskills);
    } catch (e) {
      data.webskills = [];
    }
  }

  if (data.priorskills) {
    try {
      data.priorskills = JSON.parse(data.priorskills);
    } catch (e) {
      data.priorskills = [];
    }
  }

  // 🔥 ADD ONLY THESE 3 LINES
  if (data.companyProjects) {
    try {
      data.companyProjects = JSON.parse(data.companyProjects);
    } catch (e) {
      data.companyProjects = [];
    }
  }

  if (data.dob) data.dob = new Date(data.dob);
  if (data.phone) data.phone = Number(data.phone);

  return await About.findOneAndUpdate(
    { _id: id, tenantId },
    { $set: data },
    { new: true }
  );
};


export const getAbout = async (tenantId) => {
  return await About.find({ tenantId: tenantId });
};

export const getAboutById = async (id, tenantId) => {
  return await About.findById({ _id: id, tenantId });
};

// export const updateAbout = async (id,tenantId,data) => {
//   return await About.findByIdAndUpdate({_id:id,tenantId, data});
// };

export const deleteAbout = async (id, tenantId) => {
  return await About.findOneAndDelete({ _id: id, tenantId });
};
