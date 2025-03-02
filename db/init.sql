-- Create Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
);

-- Create Expenses Table
CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    description TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert Users
INSERT INTO users (email, password_hash) VALUES
('alice@example.com', '"$2b$10$Gv8rFw6KkHqavGYqGSkJkOQNC2x.SFP22zp9gTTRXY8yTOWBc3CRa"'),
('bob@example.com', '"$2b$10$Gv8rFw6KkHqavGYqGSkJkOQNC2x.SFP22zp9gTTRXY8yTOWBc3CRa"'),
('charlie@example.com', '"$2b$10$Gv8rFw6KkHqavGYqGSkJkOQNC2x.SFP22zp9gTTRXY8yTOWBc3CRa"');

-- Insert Expenses for Alice (user_id = 1)
INSERT INTO expenses (user_id, description, amount) VALUES 
(1, 'Groceries', 50.00),
(1, 'Electric Bill', 75.00),
(1, 'Internet Subscription', 30.00),
(1, 'Gas for Car', 40.00),
(1, 'Dining Out', 25.00);

-- Insert Expenses for Bob (user_id = 2)
INSERT INTO expenses (user_id, description, amount) VALUES 
(2, 'Laptop Repair', 150.00),
(2, 'Office Supplies', 20.00),
(2, 'Taxi Fare', 25.00),
(2, 'Coffee Shop', 15.00),
(2, 'Lunch with Client', 50.00);

-- Insert Expenses for Charlie (user_id = 3)
INSERT INTO expenses (user_id, description, amount) VALUES 
(3, 'Flight Tickets', 500.00),
(3, 'Hotel Accommodation', 250.00),
(3, 'Dining at Restaurant', 60.00),
(3, 'Shopping', 120.00),
(3, 'Museum Tickets', 30.00);

