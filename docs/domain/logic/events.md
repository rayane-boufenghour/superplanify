# Events

## source_activity_id

events.source_activity_id is optional provenance metadata. An Event is independent from its source Activity after creation. Deleting an Activity does not affect previously created Events. The foreign key uses ON DELETE SET NULL, preserving Event data while removing the obsolete provenance reference.