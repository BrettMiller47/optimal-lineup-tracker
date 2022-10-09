import requests
from bs4 import BeautifulSoup
import time
from datetime import timedelta


leagueUrls = [
    "https://fantasy.espn.com/football/team?leagueId=84532749&teamId=2&seasonId=2022",
]


def getSoup(url):
    # driver = webdriver.Chrome()
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')  # response.text
    return soup
    # url = endpoint
    # driver.get(url)
    # response = requests.get(url)
    # soup = BeautifulSoup(response.text, 'html.parser')
    # return soup


# -----------------------------------------------------------------------------------

def idxExists(soup, idx):
    # find_element returns empty array when not found
    result = soup.find_element(by.xpath, '//tr[@data-idx={idx}]')
    print(f'result is {result}')
    if result != []:
        return True
    return False
# -----------------------------------------------------------------------------------


def getPlayers(soup):
    playerRowEl = soup.findAll(
        'tr', class_='Table__TR Table__TR--lg Table__odd')
    print(playerRowEl)
    # idx = 0
    # while (idxExists(idx)):
    # TODO get the player's row element

    # TODO get the player
    # TODO get the player's health status
    # TODO get the opponent
    # TODO get the projected points
    # TODO get the game's start date/time
    # TODO append to the players
    # idx += 1
    players = []
    return players


url = leagueUrls[0]
soup = getSoup(url)
soup = soup.prettify
print(soup)
# getPlayers(soup)


def getLeagueSummary(players):

    leagueSummary = []
    return leagueSummary

# -----------------------------------------------------------------------------------


def getAllLeaguesData():

    # Add each event's data to 'collection'
    collection = []
    for url in leagueUrls:
        print(f'---------- {url} ----------')
        soup = getSoup(url)
        # TODO: remaining steps in loop to get lineup suggestions
        players = getPlayers(soup)
        # TODO: summarize results
        leagueSummary = getLeagueSummary(soup)
        collection.append(leagueSummary)
        print(f'{leagueSummary}')
    return collection


# start timer
# startTime = time.time()

# getAllEventData and pretty print
# print(getAllEventData())

# end timer and print elapsed time
# endTime = time.time()
# print(timedelta(seconds=endTime - startTime))
