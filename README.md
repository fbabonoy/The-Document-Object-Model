# Student Report Application

## Overview
This application generates a dynamic report table for student assignments. It allows users to view all students' reports or filter by a specific student ID and date. The report is rendered in a responsive table format and supports resizing to adapt to various screen widths.

## Features
- Displays assignment data in a tabular format.
- Allows filtering reports by date and student ID.
- Dynamically resizes the table based on screen size.
- Provides a user-friendly interface for data input and filtering.

## Usage
1. The page displays the course name and assignment group title centered at the top.
2. Users can select either 'All Students' or 'Student ID' to filter data.
3. Enter a specific Student ID (if required).
4. Choose a date using the date picker input.
5. Click the 'Submit' button to generate the report table.
6. The table adjusts automatically to fit the screen size.

## Code Breakdown

### Main Functions
1. **createTable(data)** - Generates a table fragment for assignment data.
2. **createTitleRow(dataPerRow)** - Creates a header row for the table.
3. **createDataRow(dataPerRow)** - Creates a data row for the table.
4. **resizeTable()** - Dynamically adjusts the width of table cells based on screen size.
5. **toggleButtons(e)** - Handles toggling between 'All Students' and 'Student ID' filters.

### Event Listeners
- `window.load`: Resizes the table on page load.
- `window.resize`: Resizes the table on window resize.
- `submit.click`: Filters and displays the report based on user input.

### Inputs and Buttons
- **Search All Students**: Displays data for all students.
- **Search by Student ID**: Enables ID input for filtering.
- **Date Picker**: Selects a date to filter submissions.
- **Submit Button**: Generates the filtered report table.

## Known Issues
- Input validation for Student ID is not implemented yet.
- Additional styling improvements can be made for better readability.

## Future Improvements
- Add input validation for Student ID.
- Add sorting and export options for the table.
