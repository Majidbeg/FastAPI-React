import psycopg2

def create_database():
    conn = psycopg2.connect(
        dbname="ecommerce",
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
    cursor.execute("SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_catalog = 'ecommerce' AND table_schema = 'public' AND table_name = 'your_table_name');")
    exists = cursor.fetchone()

    if not exists:
        cursor.execute("CREATE DATABASE ecommerce")
        print("✅ Table created")
    else:
        print("⚡ Tbale already exists")


    cursor.close()
    conn.close()