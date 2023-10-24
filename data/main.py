import pandas as pd
import requests

 

# Load employee_data and manager_data from Excel files
manager_data = pd.read_excel('/home/xs371-shasha/Downloads/manager_data.xlsx', engine='openpyxl')

employee_data = pd.read_excel('/home/xs371-shasha/Downloads/employee_data.xlsx', engine='openpyxl')
employee_data_filter = employee_data.copy()

employee_data_filter['to_date'] = pd.to_datetime(employee_data_filter['leave_dates']) + pd.to_timedelta(employee_data_filter['leave_duration'], unit='d')

print("emp :", employee_data_filter)

print("manager :", manager_data)
 

# Merge employee_data and manager_data based on 'employee_name'
merged_data = pd.merge(employee_data_filter, manager_data, on='employee_name', how='left')

print("Merge data: ", merged_data)

# Filter the merged data for 'leave_type' equal to 'Sick leave'
# filtered_data = merged_data[merged_data[''] == '']


# Prepare the data for insertion into the PostgreSQL database


filtered_data = {
    'employee_name': 'name',
    'leave_dates': 'from_date',
    'manager_name': 'reporter'
}


print("Filter data :", filtered_data) 

merged_data = merged_data.rename(columns=filtered_data)

data_list = merged_data.to_dict(orient='records')



 

# Define your API endpoint URL
api_url = 'http://localhost:8086/leave'

 

# Iterate through the rows and send data to your backend API
for row in data_list:
    # payload = {
    #     "Name": row['name'],
    #     "Leave_type": row['leave_type'],
    #     "Leave_dates": row['leave_date'],
    #     "Leave_duration": row['leave_duration'],
    #     "From_date": row['from_date'].strftime('%Y-%m-%d'),
    #     "To_date": row['to_date'].strftime('%Y-%m-%d'),
    #     "Team_name": row['team_name'],
    #     "Reporter": row['reporter']
    # }

    # x = request.POST(api_url, data = row)

    response = requests.post(api_url, data=row)
    

    print(response.json())
 

    if response.status_code == 201:
        print(f'Successfully sent data for employee: {row["name"]}')
    else:
        print(f'Failed to send data for employee: {row["name"]}')
        print('Response:', response.text)