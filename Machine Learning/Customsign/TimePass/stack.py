def main_menu():
    print("Welcome to Simple UI Example")
    print("1. Say Hello")
    print("2. Say Goodbye")
    print("0. Exit")

def say_hello():
    name = input("Enter your name: ")
    print("Hello,", name)

def say_goodbye():
    print("Goodbye!")

# Main program loop
while True:
    main_menu()
    choice = input("Enter your choice: ")

    if choice == '1':
        say_hello()
    elif choice == '2':
        say_goodbye()
    elif choice == '0':
        print("Exiting...")
        break
    else:
        print("Invalid choice. Please try again.")
