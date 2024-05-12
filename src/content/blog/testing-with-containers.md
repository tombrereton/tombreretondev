---
title: 'Write Robust Tests with Testcontainers'
description: ''
pubDate: '2023-07-14'
heroImage: '/images/testing-with-containers.webp'
---

# Streamlining Integration Tests in .NET with Testcontainers

## Introduction
Integration testing plays a crucial role in ensuring that different parts of an application work together seamlessly. In the .NET ecosystem, Testcontainers offers a robust and convenient way to create and manage disposable test environments, especially when dealing with dependencies like databases, message queues, or any other services.

## What are Testcontainers?
Testcontainers is an open-source library that supports creating lightweight, throwaway instances of common databases, Selenium web browsers, or anything else that can run in a Docker container. It's incredibly useful for integration testing, as it ensures that your tests have a consistent, isolated environment that mimics production systems.

## Setting Up Testcontainers in .NET
### Prerequisites
- Ensure Docker is installed and running on your machine.
- A .NET project set up for testing (using xUnit, NUnit, or MSTest).

### Installation
- Add the Testcontainers NuGet package to your project.
```csharp
dotnet add package Testcontainers.MsSql
dotnet add package Microsoft.Data.SqlClient
dotnet add package xunit
```

### Configuration
In your test project, configure Testcontainers to launch the specific dependencies (like a SQL Server, RabbitMQ, etc.) required for your tests.

## Creating Your First Integration Test

### Define a Container
Create a container instance in your test setup. For example, to use a SQL Server container:

```csharp
private readonly MsSqlContainer _msSqlContainer 
  = new MsSqlBuilder().Build();
```

### Start the Container
Start the container before running your tests.

```csharp
public Task InitializeAsync() 
  => _msSqlContainer.StartAsync();

```

### Write the Test
Write your integration tests using the container's connection details.
Here's a simple test that checks database connectivity:

```csharp
[Fact]
public async Task CanConnectToSqlServerContainer()
{
  await using var conn = new SqlConnection(_msSqlContainer.GetConnectionString());
  await conn.OpenAsync();

  await using var command = conn.CreateCommand();
  command.CommandText = "SELECT 1;";

  var actual = await command.ExecuteScalarAsync() as int?;
  Assert.Equal(1, actual.GetValueOrDefault());
}
```

### Clean Up
Ensure the container is disposed of after tests are completed to avoid resource leaks.

```csharp
public Task DisposeAsync()
  => _msSqlContainer.DisposeAsync().AsTask();
```

### Conclusion
Testcontainers simplifies the process of writing integration tests in .NET by handling the setup and teardown of your test environments. This not only makes your tests more reliable but also eases the process of maintaining and updating your test suites.

### Further Reading
- [Testcontainers](https://Testcontainers.com/)
- [Official .NET Documentation on Integration Testing](https://learn.microsoft.com/en-us/aspnet/core/test/integration-tests?view=aspnetcore-8.0)
