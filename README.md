# directional_stock_prediction
Directional Stock prediction using information using news articles

Contains a Django powered webapp that lets you paste articles about a company and get insights regarding the change in the direction of stock price.
Models are currently trained on news articles related to Amazon(AMZN) and Apple(AAPL)

Processed data is available at https://drive.google.com/drive/folders/1Fc5UaTRnEvtIhLxCLUuzXXhJkc1077kr

Steps to Run:
1. Download the code and add data to your Google Drive.
2. Run the notebooks on Google Colab.
3. For the Django application, make sure Django is available on the target machine.
4. In your terminal, navigate to ../webapp/stock_prediction and run 
        
        python manage.py runserver
5. Open localhost:8000/prediction in your browser
6. Open settings page to add/update the model URLs obtained from executing the code in the notebooks to create API endpoints to models using FastAPI