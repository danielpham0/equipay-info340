import json

with open('employeesCopy.json', 'r+') as f:
    data = json.load(f)
    for d in data['companies']['google']:
        temp = d['Base Salary']
        d['Base Salary'] = int(temp);
    for g in data['companies']['amazon']:
        temp = g['Base Salary']
        g['Base Salary'] = int(temp);
    for m in data['companies']['microsoft']:
        temp = m['Base Salary']
        m['Base Salary'] = int(temp);
    f.seek(0)        # <--- should reset file position to the beginning.
    json.dump(data, f, indent=4)
    f.truncate()     # remove remaining part