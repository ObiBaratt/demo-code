Sanitized code from a current contract. The three files I uploaded include:
- Search component with useState and useEffect hooks, and functions to control the search result list modal.
- SearchList component with the other half of the modal behavior logic.
- Util to sort results fetched from search to display in the search bar. Client wanted max 10 results. The other complication was that of the two tables queried, the client wanted TYPE1 or TYPE2 to appear first in the results depending on if the search input was alpha or numeric. 
- The Full Text Search API with tablenames censored to that searches the apps Postgres database for data from two specific tables. 
