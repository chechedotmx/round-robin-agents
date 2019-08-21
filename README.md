# round-robin-agents
Round Robin Agents - Google Apps Script

This project uses a google sheet like [this one.](https://docs.google.com/spreadsheets/d/1iJk98RFO0nU9iFMTlC2BJIe3V2DqKPqeQ-DAn4dHkOw/edit?usp=sharing)

It find a person from the first sheet, based on a zip code and it returns in a round-robin style the persons filtered by that zip.

It creates a row in the Enquiry Log from the person that was chosen and the date that happened, also the cycle number for the round-robin.

## Installing

1. [Download or clone](https://help.github.com/en/articles/cloning-a-repository) this repository
2. You will need nodejs and clasp installed.
3. On a terminal use "clasp login" 
This step is to gain access to your account
4. Create manually a google app scripts project from https://script.google.com/home and get the scriptId from File > Project Properties
5. Add a file named "clasp.json" on the project folder with the next content:
```
{"scriptId":"xxxxxx"}
```
6. On a terminal use "clasp push"
7. To deploy use the instructions [here](https://developers.google.com/apps-script/guides/web)
