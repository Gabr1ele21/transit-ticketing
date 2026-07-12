# transit-ticketing

## Database architecture

```mermaid
erDiagram
    COMPANIES ||--o{ ROUTES : operates
    ROUTES ||--o{ TRIPS : schedules
    TRIPS ||--o{ BOOKINGS : contains
    BOOKINGS ||--|| OUTBOX_EVENTS : triggers

    COMPANIES {
        uuid id PK
        string name
        jsonb settings
    }

    ROUTES {
        uuid id PK
        uuid company_id FK
        string departure_location
        string arrival_location
        jsonb stops
    }

    TRIPS {
        uuid id PK
        uuid route_id FK
        tstzrange schedule
        int price_cents
        int available_seats
    }

    BOOKINGS {
        uuid id PK
        uuid trip_id FK
        uuid user_id FK "Nullable"
        jsonb guest_info "Nullable"
        string status "ENUM: PENDING, CONFIRMED, EXPIRED"
        timestamp_tz expires_at
        string idempotency_key UK
    }

    OUTBOX_EVENTS {
        uuid id PK
        string aggregate_type
        uuid aggregate_id
        string event_type
        jsonb payload
        string status "ENUM: PENDING, PROCESSED, FAILED"
        timestamp_tz created_at
    }