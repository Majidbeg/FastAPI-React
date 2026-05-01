import psycopg2

def create_database():
    conn = psycopg2.connect(
        dbname="postgres",
        user="user",
        password="pass",
        host="localhost"
    )
    conn.autocommit = True
    cursor = conn.cursor()

    # Check if DB exists
    cursor.execute("SELECT 1 FROM pg_database WHERE datname='ecommerce'")
    exists = cursor.fetchone()

    if not exists:
        cursor.execute("CREATE DATABASE ecommerce")
        print("✅ Database created")
    else:
        print("⚡ Database already exists")

    #check if user table is already created
    cursor.execute("SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_catalog = 'ecommerce' AND table_schema = 'public' AND table_name = 'users');")
    exists = cursor.fetchone()
  
    if not exists:
        # Create users table if it doesn't exist
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR,
                email VARCHAR UNIQUE,
                password VARCHAR,
                github_id VARCHAR UNIQUE,
                auth_provider VARCHAR DEFAULT 'local'
            );
        """)
        print("✅ Table created (if not exists)")
    else:
        print("⚡ Tbale already exists")

    cursor.close()
    conn.close() 