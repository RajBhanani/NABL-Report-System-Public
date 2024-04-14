# NABL-Report-System

Locally created for the Bhavnagar branch of Sumitomo Ltd., the project aims to ease the process of receiving samples, calculating the readings, creating a report, and finally generating a report PDF in the company’s standard format. Will be deployed in the company's internal IT infrastructure on completion. 
Current features:
- Login/logout for company employees, register is reserved only for the IT admins
- The report process is divided in three main parts:
1. Reception:
- Fill in details about the sample and the test sets that need to be performed (current four sets, combinations of 13 soil and 3 water parameters tested by the company)
- Automatic generation of sample code, the primary ID of the sample from then onwards
2. Analysis
- Provides textboxes to input lab readings for various parameters
- Rest of the calculation is done based on the formulae for the parameters
3. Report
- Final stage, allowing for any kinds of edits to the results. Once authorised, no further edits may be made.
- After authorisation, the option to generate the pdf is made available
