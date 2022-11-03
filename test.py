import requests
from bs4 import BeautifulSoup
import time
from datetime import timedelta

week = 1
teamId = 2
seasonId = 2022
leagueId = 84532749


def getSoup(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')  # response.text
    return soup


def getPlayersData(soup):
    playerRowEl = soup.findAll(
        'tr', class_='teamName truncate')
    print(playerRowEl)


def main(url):
    soup = getSoup(url)
    getPlayersData(soup)


main(
    f'https://fantasy.espn.com/football/team?seasonId={seasonId}&leagueId={leagueId}&teamId={teamId}&scoringPeriodId={week}&statSplit=singleScoringPeriod')
