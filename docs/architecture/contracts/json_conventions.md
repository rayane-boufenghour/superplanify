# JSON Conventions

## Recurrence rules

Example:

```json
{
  "frequency": "weekly",
  "interval": 2,
  "weekdays": ["monday"],
  "ends": { 
    "type": "until", 
    "date": "2027-12-31" 
  }
}
```

The application must reject unknown schema versions and unsupported combinations.

The first supported version should remain deliberately limited. Recommended initial frequencies:

```text
daily
weekly
monthly
```

A rule should not silently accept fields that are irrelevant to its frequency.

## Custom fields

Example text field:

```json
{
  "type": "text",
  "required": false,
  "constraints": {
    "max_length": 200
  }
}
```

Example numeric field:

```json
{
  "type": "int",
  "required": false,
  "constraints": {
    "minimum": 0,
    "maximum": 5000,
  }
}
```

Example selection field:

```json
{
  "type": "select",
  "required": true,
  "options": [
    {
      "id": "lecture",
      "label": "Lecture"
    },
    {
      "id": "exam",
      "label": "Exam"
    }
  ]
}
```