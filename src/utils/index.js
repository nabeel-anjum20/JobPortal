import queryString from "query-string";

export const recruiterOnBoardFormControl = [
    {
        label:"Name",
        name:"name",
        placeholder:"Enter Your Name",
        componentType:"input"
    } , 

    {
        label:"Company Name",
        name:"companyName",
        placeholder:"Enter Your Company Name",
        componentType:"input"
    } , 


    {
        label:"Company Role",
        name:"companyRole",
        placeholder:"Enter Your Company Role",
        componentType:"input"
    } , 
]


export const candidateOnBoardFormControl = [
    {
      label: "Resume",
      name: "resume",
      componentType: "file",
    },
    {
      label: "Name",
      name: "name",
      placeholder: "Enter your name",
      componentType: "input",
    },
    {
      label: "Current Company",
      name: "currentCompany",
      placeholder: "Enter your current company",
      componentType: "input",
    },
    {
      label: "Current Job Location",
      name: "currentJobLocation",
      placeholder: "Enter your current job location",
      componentType: "input",
    },
    {
      label: "Prefered Job Location",
      name: "preferedJobLocation",
      placeholder: "Enter your prefered job location",
      componentType: "input",
    },
    {
      label: "Current Salary",
      name: "currentSalary",
      placeholder: "Enter your current salary",
      componentType: "input",
    },
    {
      label: "Notice Period",
      name: "noticePeriod",
      placeholder: "Enter your notice period",
      componentType: "input",
    },
    {
      label: "Skills",
      name: "skills",
      placeholder: "Enter your skills",
      componentType: "input",
    },
    {
      label: "Previous Companies",
      name: "previousCompanies",
      placeholder: "Enter your previous companies",
      componentType: "input",
    },
    {
      label: "Total Experience",
      name: "totalExperience",
      placeholder: "Enter your total experience",
      componentType: "input",
    },
    {
      label: "College",
      name: "college",
      placeholder: "Enter your college",
      componentType: "input",
    },
    {
      label: "College Location",
      name: "collegeLocation",
      placeholder: "Enter your college location",
      componentType: "input",
    },
    {
      label: "Graduated Year",
      name: "graduatedYear",
      placeholder: "Enter your graduated year",
      componentType: "input",
    },
    {
      label: "Linkedin Profile",
      name: "linkedinProfile",
      placeholder: "Enter your linkedin profile",
      componentType: "input",
    },
    {
      label: "Github Profile",
      name: "githubProfile",
      placeholder: "Enter your github profile",
      componentType: "input",
    },
  ];

  
  export const postNewJobFormControls = [
    {
      label: "Company Name",
      name: "companyName",
      placeholder: "Company Name",
      componentType: "input",
      disabled: true,
    },
    {
      label: "Title",
      name: "title",
      placeholder: "Job Title",
      componentType: "input",
    },
    {
      label: "Type",
      name: "type",
      placeholder: "Job Type",
      componentType: "input",
    },
    {
      label: "Location",
      name: "location",
      placeholder: "Job Location",
      componentType: "input",
    },
    {
      label: "Experience",
      name: "experience",
      placeholder: "Experience",
      componentType: "input",
    },
    {
      label: "Description",
      name: "description",
      placeholder: "Description",
      componentType: "input",
    },
    {
      label: "Skills",
      name: "skills",
      placeholder: "Skills",
      componentType: "input",
    },
  ];
  


export const initialRecruiterFormData = {
    name: "",
    companyName: "",
    companyRole: "",
  };
  
  export const initialCandidateFormData = {
    resume: "",
    name: "",
    currentJobLocation: "",
    preferedJobLocation: "",
    currentSalary: "",
    noticePeriod: "",
    skills: "",
    currentCompany: "",
    previousCompanies: "",
    totalExperience: "",
    college: "",
    collegeLocation: "",
    graduatedYear: "",
    linkedinProfile: "",
    githubProfile: "",
  };


  export const initialPostNewJobFormData = {
    companyName: "",
    title: "",
    type: "",
    location: "",
    experience: "",
    description: "",
    skills: "",
  };


export const memberShipPlan = [
    {
      id:1,
      heading:"Tier 1",
      price:100,
      type:'basic'
    } , 

    {
      id:2,
      heading:"Tier 2",
      price:1000,
      type:'teams'
    } , 

    {
      id:3,
      heading:"Tier 3",
      price:5000,
      type:'enterprise'
    } , 
  ]


  export const filterMenuArrayData = [
    {
      id:"companyName",
      label:"Company Name"
    } , 

    {
      id:"title",
      label:"Title"
    } , 


    {
      id:"location",
      label:"Location"
    } , 

    {
      id:"type",
      label:"Type"
    } , 
  ]


export const createUrlQuery = ({params , dataToAdd }) => {
  let currentUrl = queryString.parse(params)
  if(Object.keys(dataToAdd).length > 0){
    Object.keys(dataToAdd).map((item)=>{
      if(dataToAdd[item].length === 0){
        delete currentUrl[item]
      }else{
        currentUrl[item] = dataToAdd[item].join(",")
      }
    })
  }

  return queryString.stringifyUrl({
    url:window.location.pathname,
    query:currentUrl
  } , 

  {
    skipNull:true
  }

)
}